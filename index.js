const express = require("express");
const fs = require("fs");
const sharp = require("sharp");
const formidable = require("formidable");
const crypto = require("crypto");
const session = require("express-session");
const nodemailer = require("nodemailer");
const helmet = require("helmet");
const { Client } = require("pg");

//hello
// creare server
app = express();

app.set("view engine", "ejs");

app.use(helmet.frameguard()); //pentru a nu se deschide paginile site-ului in frame-uri

//crearea sesiunii (obiectul de tip request capata proprietatea session si putem folosi req.session)
app.use(
  session({
    secret: "abcdefg", //folosit de express session pentru criptarea id-ului de sesiune
    resave: true,
    saveUninitialized: false,
  })
);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// setam pentru toate cererile ca in locals sa avem campul utilizator cu valoarea preluata din datele salvate in sesiune
//obiectul req.session.utilizator a fost creat cand utilizatorul a facut cerere catre /login
app.use("/*", function (req, res, next) {
  res.locals.utilizator = req.session.utilizator;
  //TO DO de adaugat vectorul de optiuni pentru meniu (sa se transmita pe toate paginile)
  next();
});

var client;

if (process.env.SITE_ONLINE) {
  protocol = "https://";
  numeDomeniu = "blooming-harbor-15418.herokuapp.com";
  client = new Client({
    user: "vbbnskozcktvpa",
    password:
      "e269ad2ccdaeed503e89dc13c3b02404dffd78ab52f6bd1f2f7bccf82692fa7b",
    database: "d8fegbipuj9kun",
    host: "ec2-52-20-143-167.compute-1.amazonaws.com",
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  client = new Client({
    user: "theodorbigu",
    password: "parola",
    database: "Luxa_Flower_Shop",
    host: "localhost",
    port: 5432,
  });
  protocol = "http://";
  numeDomeniu = "localhost:8081";
}
client.connect();

// var client = new Client({
//   user: "vbbnskozcktvpa",
//   password: "e269ad2ccdaeed503e89dc13c3b02404dffd78ab52f6bd1f2f7bccf82692fa7b",
//   host: "ec2-52-20-143-167.compute-1.amazonaws.com",
//   port: 5432,
//   database: "d8fegbipuj9kun",
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
// client.connect();

app.get("/produse", function (req, res) {
  console.log(req.query);
  var conditie = "";
  if (req.query.tip) conditie += ` and tip_produs='${req.query.tip}'`;
  client.query(
    `select * from "produse" where 1=1 ${conditie}`,
    function (err, rez) {
      console.log(err);
      if (!err) {
        res.render("pagini/produse", {
          produse: rez.rows,
          cale: obiect_imagini.cale_galerie,
          imagini: obiect_imagini.imagini,
        });
      } else {
        console.log(err);
        res.render("pagini/eroare", {
          cale: obiect_imagini.cale_galerie,
          imagini: obiect_imagini.imagini,
        });
      }
    }
  );
});

app.get("/produs/:id", function (req, res) {
  console.log(req.params);
  client.query(
    `select * from produse where id=${req.params.id}`,
    function (err, rez) {
      if (!err) {
        console.log(rez);
        res.render("pagini/produs", {
          pr: rez.rows[0],
          cale: obiect_imagini.cale_galerie,
          imagini: obiect_imagini.imagini,
        });
      } else {
        //TO DO curs
      }
    }
  );
});

// app.get("/produs/:id", function (req, res) {
//   //console.log(req.params);
// });

//orice cerere care incepe cu "resurse" mergi la folderul resurse(static)
app.use("/resurse", express.static(__dirname + "/resurse"));
app.use("/poze_uploadate", express.static(__dirname + "/poze_uploadate"));

const creeazaImagini = () => {
  let buf = fs
    .readFileSync(__dirname + "/resurse/json/galerie.json")
    .toString("utf-8");
  obiect_imagini = JSON.parse(buf);
  //console.log(obiect_imagini);

  for (let imag of obiect_imagini.imagini) {
    let aux = imag.fisier.split(".");
    //console.log(aux);
    let nume_imag = aux[0];
    let extensie = aux[1];

    let dim_mic = 150;
    let dim_mediu = 300;

    imag.mic = `${obiect_imagini.cale_galerie}mic/${nume_imag}-${dim_mic}.webp`; // nume-150.wbp
    imag.mediu = `${obiect_imagini.cale_galerie}mediu/${nume_imag}-${dim_mediu}.webp`;
    imag.mare = `${obiect_imagini.cale_galerie}${imag.fisier}`;

    if (!fs.existsSync(imag.mic)) {
      sharp(__dirname + "/" + imag.mare)
        .resize(dim_mic)
        .toFile(__dirname + "/" + imag.mic);
    }
    if (!fs.existsSync(imag.mediu)) {
      sharp(__dirname + "/" + imag.mare)
        .resize(dim_mediu)
        .toFile(__dirname + "/" + imag.mediu);
    }
  }
};

creeazaImagini();

app.get(["/", "/home", "/index"], function (req, res) {
  res.render("pagini/index", {
    ip: req.ip,
    imagini: obiect_imagini.imagini,
    cale: obiect_imagini.cale_galerie,
  }); // calea pagini/index e relativa la folderul views
});

//utilizatorul nu are voie sa vada fisiere.ejs
app.get("/*.ejs", function (req, res) {
  res.status(403).render("pagini/403");
});

parolaCriptare = "curs_tehnici_web";

app.post("/inreg", function (req, res) {
  var formular = new formidable.IncomingForm();
  var username;
  var caleImagine = "";
  formular.parse(req, function (err, campuriText, campuriFile) {
    //4
    //verificari - TO DO
    var eroare = "";
    if (!campuriText.username)
      eroare += "Username-ul nu poate fi necompletat. ";
    //TO DO - de completat pentru restul de campuri required

    if (!campuriText.username.match("^[A-Za-z0-9]+$"))
      eroare +=
        "Username-ul trebuie sa contina doar litere mici/mari si cifre. ";
    //TO DO - de completat pentru restul de campuri functia match

    if (eroare != "") {
      res.render("pagini/inregistrare", {
        err: eroare,
        imagini: obiect_imagini.imagini,
        cale: obiect_imagini.cale_galerie,
      });
      return;
    }

    queryVerifUtiliz = " select * from utilizatori where username= $1::text ";
    console.log(queryVerifUtiliz);

    client.query(queryVerifUtiliz, [campuriText.username], function (err, rez) {
      if (err) {
        console.log("===", err);
        res.render("pagini/inregistrare", {
          err: "Eroare baza date",
          imagini: obiect_imagini.imagini,
          cale: obiect_imagini.cale_galerie,
        });
      } else {
        if (rez.rows.length == 0) {
          var criptareParola = crypto
            .scryptSync(campuriText.parola, parolaCriptare, 32)
            .toString("hex");
          var token2 = genereazaToken(80);
          var data = new Date();
          var token1 =
            "" +
            data.getFullYear() +
            data.getMonth() +
            data.getDay() +
            data.getHours() +
            data.getMinutes() +
            data.getSeconds();
          var token = token1 + "/" + campuriText.username + "/" + token2;
          var queryUtiliz = `insert into utilizatori (username, nume, prenume, parola, email, fotografie, cod) values ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::text)`;

          //console.log(queryUtiliz, criptareParola);
          client.query(
            queryUtiliz,
            [
              campuriText.username,
              campuriText.nume,
              campuriText.prenume,
              criptareParola,
              campuriText.email,
              caleImagine,
              token,
            ],
            function (err, rez) {
              //TO DO parametrizati restul de query
              if (err) {
                console.log(err);
                res.render("pagini/inregistrare", {
                  err: "Eroare baza date",
                  imagini: obiect_imagini.imagini,
                  cale: obiect_imagini.cale_galerie,
                });
              } else {
                trimiteMail(campuriText.username, campuriText.email, token);
                res.render("pagini/inregistrare", {
                  err: "",
                  raspuns: "Date introduse",
                  imagini: obiect_imagini.imagini,
                  cale: obiect_imagini.cale_galerie,
                });
              }
            }
          );
        } else {
          eroare += "Username-ul mai exista. ";
          res.render("pagini/inregistrare", {
            err: eroare,
            imagini: obiect_imagini.imagini,
            cale: obiect_imagini.cale_galerie,
          });
        }
      }
    });
  });
  formular.on("field", function (nume, val) {
    // 1 pentru campuri cu continut de tip text (pentru inputuri de tip text, number, range,... si taguri select, textarea)
    console.log("----> ", nume, val);
    if (nume == "username") username = val;
  });
  formular.on("fileBegin", function (nume, fisier) {
    console.log("----> ", nume, fisier);
    folderUtilizator = __dirname + "/poze_uploadate/" + username + "/";
    if (!fs.existsSync() && fisier.originalFilename != "") {
      fs.mkdirSync(folderUtilizator);
      v = fisier.originalFilename.split(".");
      fisier.filepath = folderUtilizator + "poza." + v[v.length - 1]; //setez calea de upload
      console.log(fisier.filepath);
      caleImagine = fisier.filepath;
      console.log("caleImagine ---->", caleImagine);
    }
  });
  formular.on("file", function (nume, fisier) {
    //3
    //s-a terminat de uploadat
    console.log("fisier uploadat");
  });
});

function genereazaToken(lungime) {
  sirAleator = "";
  for (let i = 0; i < lungime; i++) {
    sirAleator += sirAlphaNum[Math.floor(Math.random() * sirAlphaNum.length)];
  }
  return sirAleator;
}

sirAlphaNum = "";
v_intervale = [
  [66, 68],
  [70, 72],
  [74, 78],
  [80, 84],
  [86, 90],
];
for (let interval of v_intervale) {
  for (let i = interval[0]; i <= interval[1]; i++)
    sirAlphaNum += String.fromCharCode(i);
}
//console.log(sirAlphaNum);

async function trimiteMail(username, email, token) {
  var transp = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      //date login
      user: "florarialuxa@gmail.com",
      pass: "proiectscolar12345",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  //genereaza html
  await transp.sendMail({
    from: "florarialuxa@gmail.com",
    to: email,
    subject: "Te-ai inregistrat cu succes",
    text: "Username-ul tau este " + username,
    html: `<h1>Salut!</h1><p style='color:blue'>Username-ul tau este ${username}.</p> <p><a href='http://${numeDomeniu}/confirmare_mail/${token}'>Click aici pentru confirmare</a></p>`,
  });
  console.log("trimis mail");
}

app.get("/confirmare_mail/:token1/:user/:token2", function (req, res) {
  var token =
    req.params.token1 + "/" + req.params.user + "/" + req.params.token2;
  var queryUpdate = `update utilizatori set confirmat_mail=true where username = '${req.params.user}' and cod= '${token}' `;
  client.query(queryUpdate, function (err, rez) {
    if (err) {
      console.log(err);
      res.render("pagini/eroare", {
        err: "Eroare baza date",
        imagini: obiect_imagini.imagini,
        cale: obiect_imagini.cale_galerie,
      });
      return;
    }
    if (rez.rowCount > 0) {
      res.render("pagini/confirmare", {
        imagini: obiect_imagini.imagini,
        cale: obiect_imagini.cale_galerie,
      });
    } else {
      res.render("pagini/eroare", {
        err: "Eroare link",
        imagini: obiect_imagini.imagini,
        cale: obiect_imagini.cale_galerie,
      });
    }
  });
});

app.get("/useri", function (req, res) {
  if (
    req.session &&
    req.session.utilizator &&
    req.session.utilizator.rol == "admin"
  ) {
    client.query("select * from utilizatori", function (err, rez) {
      if (err) throw err;
      //console.log(rezultat);
      res.render("pagini/useri", {
        useri: rez.rows,
        imagini: obiect_imagini.imagini,
        cale: obiect_imagini.cale_galerie,
      }); //afisez index-ul in acest caz
    });
  } else {
    res.status(403).render("pagini/403", {
      mesaj: "Nu aveti acces",
      imagini: obiect_imagini.imagini,
      cale: obiect_imagini.cale_galerie,
    });
  }
});

app.post("/login", function (req, res) {
  var formular = new formidable.IncomingForm();

  formular.parse(req, function (err, campuriText, campuriFile) {
    console.log(campuriText);

    var querylogin = `select * from utilizatori where username= '${campuriText.username}' `;
    client.query(querylogin, function (err, rez) {
      if (err) {
        res.render("pagini/eroare", {
          mesaj: "Eroare baza date. Incercati mai tarziu.",
          imagini: obiect_imagini.imagini,
          cale: obiect_imagini.cale_galerie,
        });
        return;
      }
      if (rez.rows.length != 1) {
        //ar trebui sa fie 0
        res.render("pagini/eroare", {
          mesaj: "Username-ul nu exista.",
          imagini: obiect_imagini.imagini,
          cale: obiect_imagini.cale_galerie,
        });
        return;
      }
      var criptareParola = crypto
        .scryptSync(campuriText.parola, parolaCriptare, 32)
        .toString("hex");
      console.log(criptareParola);
      console.log(rez.rows[0].parola);
      if (criptareParola == rez.rows[0].parola && rez.rows[0].confirmat_mail) {
        console.log("totul ok");
        req.session.mesajLogin = null; //resetez in caz ca s-a logat gresit ultima oara
        if (req.session) {
          req.session.utilizator = {
            id: rez.rows[0].id,
            username: rez.rows[0].username,
            nume: rez.rows[0].nume,
            prenume: rez.rows[0].prenume,
            culoare_chat: rez.rows[0].culoare_chat,
            email: rez.rows[0].email,
            rol: rez.rows[0].rol,
          };
        }
        // res.render("pagini"+req.url);
        res.redirect("/index");
      } else {
        req.session.mesajLogin = "Login esuat";
        res.redirect("/index");
        //res.render("pagini/index",{ip:req.ip, imagini:obImagini.imagini, cale:obImagini.cale_galerie,mesajLogin:"Login esuat"});
      }
    });
  });
});

app.post("/sterge_utiliz", function (req, res) {
  if (
    req.session &&
    req.session.utilizator &&
    req.session.utilizator.rol == "admin"
  ) {
    var formular = new formidable.IncomingForm();

    formular.parse(req, function (err, campuriText, campuriFisier) {
      //var comanda=`delete from utilizatori where id=${campuriText.id_utiliz} and rol!='admin'`;
      var comanda = `delete from utilizatori where id=$1 and rol !='admin' and nume!= $2::text `;
      client.query(
        comanda,
        [campuriText.id_utiliz, "Mihai"],
        function (err, rez) {
          // TO DO mesaj cu stergerea
          if (err) console.log(err);
          else {
            if (rez.rowCount > 0) {
              console.log("sters cu succes");
            } else {
              console.log("stergere esuata");
            }
          }
        }
      );
    });
  }
  res.redirect("/useri");
});

app.post("/profil", function (req, res) {
  console.log("profil");
  if (!req.session.utilizator) {
    res.render("pagini/eroare", {
      mesaj: "Nu sunteti logat.",
      imagini: obiect_imagini.imagini,
      cale: obiect_imagini.cale_galerie,
    });
    return;
  }
  var formular = new formidable.IncomingForm();

  formular.parse(req, function (err, campuriText, campuriFile) {
    console.log(err);
    console.log(campuriText);
    var criptareParola = crypto
      .scryptSync(campuriText.parola, parolaCriptare, 32)
      .toString("hex");

    //toti parametrii sunt cu ::text in query-ul parametrizat fiindca sunt stringuri (character varying) in tabel
    var queryUpdate = `update utilizatori set nume=$1::text, prenume=$2::text, email=$3::text, culoare_chat=$4::text where username= $5::text and parola=$6::text `;

    client.query(
      queryUpdate,
      [
        campuriText.nume,
        campuriText.prenume,
        campuriText.email,
        campuriText.culoareText,
        req.session.utilizator.username,
        criptareParola,
      ],
      function (err, rez) {
        if (err) {
          console.log(err);
          res.render("pagini/eroare", {
            mesaj: "Eroare baza date. Incercati mai tarziu.",
            imagini: obiect_imagini.imagini,
            cale: obiect_imagini.cale_galerie,
          });
          return;
        }
        console.log(rez.rowCount);
        if (rez.rowCount == 0) {
          res.render("pagini/profil", {
            mesaj: "Update-ul nu s-a realizat. Verificati parola introdusa.",
            imagini: obiect_imagini.imagini,
            cale: obiect_imagini.cale_galerie,
          });
          return;
        }

        req.session.utilizator.nume = campuriText.nume;
        req.session.utilizator.prenume = campuriText.prenume;

        req.session.utilizator.culoare_chat = campuriText.culoareText;
        req.session.utilizator.email = campuriText.email;

        res.render("pagini/profil", {
          mesaj: "Update-ul s-a realizat cu succes.",
          imagini: obiect_imagini.imagini,
          cale: obiect_imagini.cale_galerie,
        });
      }
    );
  });
});

//EXAMEN

// app.get("/produse", function (req, res) {
//   let conditie = `where 1=1`;
//   console.log(req.query.tip);
//   if (req.query.tip) {
//     conditie += ` and tip_produs='${req.query.tip}'`;
//   }
//   client.query(`select * from "produse"` + conditie, function (err, rez) {
//     //console.log(err, rez);
//     res.render("pagini/produse", { produse: rez.rows });
//   });
// });

app.get("/reviste", function (req, res) {
  client.query(`select * from "reviste"`, function (err, rez) {
    //res.send(rez.rows);
    res.render("pagini/reviste", { reviste: rez.rows });
  });
});

app.post("/produse_cos", function (req, res) {
  //console.log("req.body: ",req.body);
  //console.log(req.get("Content-type"));
  //console.log("body: ",req.get("body"));

  /* prelucrare pentru a avea toate id-urile numerice si pentru a le elimina pe cele care nu sunt numerice */
  var iduri = [];
  for (let elem of req.body.ids_prod) {
    let num = parseInt(elem);
    if (!isNaN(num))
      //daca este numar
      iduri.push(num);
  }
  if (iduri.length == 0) {
    res.send("eroare");
    return;
  }

  //console.log("select id, nume, pret, gramaj, calorii, categorie, imagine from prajituri where id in ("+iduri+")");
  client.query(
    "select id, nume, pret, gramaj, calorii, categorie, imagine from prajituri where id in (" +
      iduri +
      ")",
    function (err, rez) {
      //console.log(err, rez);
      //console.log(rez.rows);
      res.send(rez.rows);
    }
  );
});

app.get("/*", function (req, res) {
  console.log(req.url);
  res.render(
    "pagini" + req.url,
    { imagini: obiect_imagini.imagini, cale: obiect_imagini.cale_galerie },
    (err, rezultatRender) => {
      //console.log(rezultatRender);
      if (err) {
        if (err.message.includes("Failed to lookup")) {
          res.status(404).render("pagini/404");
          return;
        } else {
          console.log(err);
          res.render("pagini/eroare", {
            imagini: obiect_imagini.imagini,
            cale: obiect_imagini.cale_galerie,
          });
        }
      } else {
        res.send(rezultatRender);
      }
    }
  );
});

var s_port = process.env.PORT || 8081;
const host = "0.0.0.0";

app.listen(s_port, host, function () {
  console.log("Serverul a pornit pe portul: " + s_port);
});
