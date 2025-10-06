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
    callbackUrl: "http://localhost:3000/login/callback",
    issuer: "http://localhost/20166932",
    entryPoint: "https://wayf.ucol.mx/saml2/idp/SSOService.php", // URL para iniciar sesión
    logoutUrl: "https://wayf.ucol.mx/saml2/idp/SingleLogoutService.php",
    logoutCallbackUrl: "http://localhost:3000/logout/callback",
    decryptionPvk: fs.readFileSync(__dirname + "/cert/key.pem", "utf8"),
    cert: fs.readFileSync(__dirname + "/cert/new_idp.crt", "utf8"),
  },
  (profile, done) => {
    const user = Object.assign({}, profile);
    console.log("Perfil del usuario:", user);
    return done(null, profile);
  }
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(
  session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    resave: true,
  })
);
passport.use(samlStrategy);

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
  (req, res) => {
    // Guardamos solo lo que necesitamos en la sesión
    req.session.user = {
      nameID: req.user.nameID,
      displayName: req.user.displayName,
      email: req.user.email,
    };
    console.log("Usuario en sesión:", req.session.user);
    // Rediriges a tu página principal o dashboard
    res.redirect("/dashboard");
  }
);

app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login"); // Si no hay sesión, manda a login
  }

  res.send(`Bienvenido ${req.session.user.displayName}`);
});

app.get("/logout", (req, res) => {
  if (!req.user) res.redirect("/");

  samlStrategy.logout(req, (err, request) => {
    return res.redirect(request);
  });
});

app.get("/me", (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ error: "No autorizado" });
  res.json(req.session.user);
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
