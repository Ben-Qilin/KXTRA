import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import adminCheckRole from "../../utils/role.js";
import nodemailer from 'nodemailer';

dotenv.config();

// ! Les messages d'erreur actuels sont corrects, mais vous pourriez envisager de les rendre plus explicites. Par exemple, au lieu de "La combinaison utilisateur mot de passe est erronée", vous pourriez spécifier si l'erreur est due à un utilisateur introuvable ou à un mot de passe incorrect.
// ! créer un utilisateur
// ? chose de plus explicite comme userAuthController ou authenticationController pour indiquer clairement le rôle du contrôleur.7
const authController = {
  // ! si on veut utiliser async et await le mettre en debut de fonction !!
  register: async (req, res) => {
    const { firstname, lastname, password, email, birthday, phone_user } =
      req.body;

    // Engistrer un utilisateur
    try {
      // J'ecris la liste de mes options pour verifier la robustesse d'un mot de passe
      const options = {
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      };
      // Si le mot de passe ne respecte pas les crites (1 maj, 1 min, 1 symbol, 1 chiffre)
      if (!validator.isStrongPassword(req.body.password, options)) {
        // Je jette une erreur avec le message: 'le mot de passe doit ...'
        throw new Error(
          "Le mot de passe doit comporter au moins 12 caractères et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      // ! La méthode create d'un modèle est asynchrone, elle renvoie donc une Promise. Pour attendre
      // la création de l'utilisateur avant de passer à la suite, on utilise le mot clé 'await' sinon ne se transforme pas en Promise, objet non utilisable, ne se renvoie pas à l'utilisateur Promise jamais résolut.
      // ! Passer à la suite que si l'utilisatuer est créer.
       // 🚩 créer le token de validation
       const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: '3 days' });
      const user = await User.create({
        firstname,
        lastname,
        password: hashedPassword,
        email: email.toLowerCase(),
        birthday,
        phone_user: parseInt(phone_user),
        validation_token: token
      });

       // Configuration du transport Nodemailer
       const sendEmail = async function (to, subject, text, html, validationLink) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: process.env.SMTP_SECURE === 'true', // Utilisez "secure: true" pour activer TLS
          auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
          },
        })

        // Options de l'e-mail
        const mailOptions = {
          from: process.env.SMTP_EMAIL,
          to: to,
          subject: subject,
          text: text,
          html: html,
        }

        // Envoyer l'e-mail de validation
        try {
          let info = await transporter.sendMail(mailOptions);
          console.log('E-mail de validation envoyé : ' + info.response);
        } catch (error) {
          console.log('Erreur lors de l\'envoi de l\'e-mail : ' + error);
        }
      };

      // Exemple d'utilisation
      const recipients = [email, 'alain.provistdu69@gmail.com'];
      const iconMail = "https://drive.google.com/uc?export=view&id=1rJfMEmfZfhthAzqikaWqG66jLxkhMU4P";

      recipients.forEach((recipient) => {
        const subject = 'Validation d\'e-mail, envoi automatique';
        const validationLink = `http://localhost:1234/validation-email/${token}`;
        const text = 'Cet e-mail est envoyé automatiquement lors de votre inscription à Qualiextra.';
        const html = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Validation d'e-mail</title>
        
    </head>
    <body style="font-family:'Segoe UI', sans-serif; background-color: #241e4e; padding: 1rem;">
    <div style="background-color: white; border-radius: 1rem; padding: 1rem; border: 3px solid  rgba(255, 255, 255, 0.373); margin:1rem;">
        <img src=${iconMail} alt"Logo qauliextra" style="width: 6rem; object-fit: cover; display: block; border-radius: 1rem; margin:1rem;"></img>
        <h1 style="color: orangered; text-align: start;">Validation d'e-mail</h1>
    </div>
    <div style="padding: 2rem;">
        <p style="color: white; text-align: center;">Cet e-mail est envoyé automatiquement lors de votre inscription à Qualiextra.</p>
        <p style="color: white;  text-align: center;">Merci de cliquer sur le lien ci-dessous pour valider votre adresse e-mail :</p>
        <a href=${validationLink} style=" text-align: center; text-decoration: none; color: orangered; border: 2px solid orangered; background-color:white; padding: 0.5rem 1rem; border-radius: 0.7rem">Valider mon e-mail</a>
        <p style="color: white;  text-align: center;">Si le lien ci-dessus ne fonctionne pas, vous pouvez copier et coller l'URL suivante dans votre navigateur :</p>
        <p style="color: white;  text-align: center;">${validationLink}</p>
        <p style="color: orangered;  text-align: center;">Merci de nous avoir rejoins !</p>
        </div>
    </body>
    
    </html>
    `;


        sendEmail(recipient, subject, text, html, validationLink);
      });

      // quand le serveur renvoie un réponse il nous donne juste ses 4 là, ceux qu'on lui demande. Peut aussi avoir une image de profil ou un description...
      // ! doit être envoyer en json
      res.status(201).send({ message: "L'utilisateur a été créer. " });

      // Si jamais j'ai eu une erreur n'importe ou dans mon try, je passe dans le catch
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  },

    login: async (req, res) => {
      const { email, password } = req.body;

      try {
        // J'attend qu'un seul utilisateur de ma bdd soit relier à un email
        const foundUser = await User.findOne({
          where: {
            email: email.toLowerCase(),
          },
        });
        // Si il y a bien un utilisateur avec cet email
        if (foundUser) {
          const passwordMatching = await bcrypt.compare(
            password,
            foundUser.password
          );

          if (passwordMatching) {
            const token = jwt.sign(
              { userId: foundUser.id, role: foundUser.role },
              process.env.SECRET,
              { algorithm: "HS256", expiresIn: "1h" }
            );

            // if (token.expires) {
            //     this.refreshToken(User.id);
            // }

            // si je veux voir mon token dans mon terminal je loggin
            res.json({ token, user: foundUser });
            // sinon je renvoie une page non-autoriser
          } else {
            res.status(401).json({ message: "Unauthorized" });
          }
          // sinon je renvoie une page non-autoriser
        } else {
          res.status(401).json({ message: "Unauthorized" });
        }
        // sinon je renvoie une page non-autoriser
      } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
      }
    },
    validationEmail: async (req, res) => {
      try {
        // Récupérer le token du corps de la requête
        const { token } = req.params;
  
        // Vérifier le token
        const payload = jwt.verify(token, process.env.SECRET);
  
        // Récupérer l'utilisateur associé au token
        const user = await User.findOne({
          where: {
            email: payload.email,
          }
        });
  
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }
        // !Vérifier la date de validiter du token sinon on ne valid pas le compte
        if(Date.now() > payload.expiresIn){
          return res.status(401).json({ message: 'Token est expiré.' });
        }
  
        // si le token expire au bout de trois et qui ne valide pas le compte alors le compte sera inutilisable ave cle même email.
        // soit on régenere le mail pour le valider soit on supprime le compte pour qu'il puisse recréer un compte.
  
        // Valider l'e-mail de l'utilisateur
        user.validation_token = null;
        await user.save();
  
        res.send(true)
      } catch (error) {
        res.status(400).send(false);
      }
    }
  
      // refreshToken: async (req, res) => {
      //   const { token } = req.body;

      //   try {
      //     const decoded = jwt.verify(token, process.env.SECRET);
      //     const newToken = jwt.sign({ userId: decoded.userId }, process.env.SECRET, { algorithm: "HS256", expiresIn: '1h' });
      //     res.json({ token: newToken });
      //   } catch (error) {
      //     res.status(401).json({ message: "Unauthorized" });
      //   }
      // },
};

export default authController;
