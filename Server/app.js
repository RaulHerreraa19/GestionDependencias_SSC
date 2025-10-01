const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const routes = require("./routes/routes");
const session = require("express-session");
const passport = require("passport");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const SamlStrategy = require("passport-saml").Strategy;
const ensureAuthenticated = require("./Middlewares/ensureAuthenticated");

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.use(cookieParser());
app.use(
  session({
    secret: "TU_SECRETO",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

const samlStrategy = new SamlStrategy(
  {
    callbackUrl: "https://898c5fcc91cc.ngrok-free.app/login/callback",
    entryPoint: "https://wayf.ucol.mx/saml2/idp/SSOService.php", // URL para iniciar sesión
    logoutUrl: "https://wayf.ucol.mx/saml2/idp/SingleLogoutService.php",
    logoutCallbackUrl: "https://898c5fcc91cc.ngrok-free.app/logout/callback",
    issuer: "https://898c5fcc91cc.ngrok-free.app/saml/metadata", // Identificador de tu aplicación
    decryptionPvk: fs.readFileSync(__dirname + "/cert/key.pem", "utf8"),
    privateCert: fs.readFileSync(__dirname + "/cert/cert.pem", "utf8"),
    cert: fs.readFileSync(__dirname + "/cert/idp.crt", "utf8"),
  },
  function (profile, done) {
    // Aquí defines qué hacer con los datos del usuario
    return done(null, profile);
  }
);
passport.use(samlStrategy);

app.get("/", ensureAuthenticated, (req, res) => res.send("Authenticated"));

app.get(
  "/login",
  passport.authenticate("saml", {
    failureRedirect: "/login/fail",
    failureFlash: true,
  }),
  (req, res) => res.redirect("/")
);

app.post(
  "/login/callback",
  passport.authenticate("saml", {
    failureRedirect: "/login/fail",
    failureFlash: true,
  }),
  (req, res) => res.send(req.user)
);

app.get("/logout", (req, res) => {
  if (!req.user) res.redirect("/");

  samlStrategy.logout(req, (err, request) => {
    return res.redirect(request);
  });
});

app.post("/logout/callback", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/saml/metadata", (req, res) => {
  res.type("application/xml");
  res
    .status(200)
    .send(
      samlStrategy.generateServiceProviderMetadata(
        fs.readFileSync(__dirname + "/cert/cert.pem", "utf8")
      )
    );
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
