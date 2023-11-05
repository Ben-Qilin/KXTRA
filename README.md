# Qualiextra

Groupe : Benjamin, Andréa, Sarah, Amel et Déborah

## La présentation du projet

Quali-extra est une plateforme numérique innovante visant à révolutionner l'expérience hôtelière et gastronomique pour les utilisateurs et les fournisseurs de services. En mettant l'accent sur la mise en relation transparente et l'expérience unique, elle vise à combler le fossé entre la demande d'expériences personnalisées et l'offre d'établissements hôteliers et de restaurants de qualité.

## La définition des besoins et objectifs du projet

- Besoins : (problème auxquels répond le projet) => créer lien entre client et prestataire en local
- Objectifs : (solutions qu’apporte le projet) => mise en relation entre prestataires et clients.

## MVP

### Fonctionnalités clès

- Mise en relation des clients avec les offres d’hôteliers/restaurateurs: Filtrage des expériences par les clients

- Réservation de nuitées et/ou d’expériences par les clients

- Proposition de nuitées et/ou d’expériences par les prestataires.

- Conception de l’interface utilisateur (UI) : Interface pour les clients pour visualiser les établissements

- Développement : Développer les fonctionnalités clés en premier Assurer que l’application est responsive et peut être utilisée sur différents appareils.

- Générer des mails dynamique/automatique selon l’utilisation (mail de confirmation d’inscription ou mail réservation) / Sécurité mail / changement de mot de passe

- Les évolutions potentielles : (ce qui ne sera pas terminé) : tout ce qui est prévu mais ne fait pas partie du MVP : Mode de paiement : grille tarifaire / Yield-management (augmentation des prix en fonction de la demande)

- Connexion rapide via d’autres services / auto-complétions (boîte mail et autres)

- Carte/map dynamique avec les points d’intérêt (hôtels et restaurant) / FILTRES (ville / prestation / avis (étoiles) / prix / catégorie (festive, tendance, classique etc.) / type de réservation (résa en ligne, tel et indifférent) / accessibilité (handi))

## La liste des technologies utilisées pour le projet (spécifications techniques)

- REACT / JavaScript Front-end    (Andréa / Sarah / Benjamin / Amel / Déborah)
- NodeJS (expressJS) / JavaScript Back-end (Déborah / Benjamin /Amel)
- PROSTGRESQL : demande d’ajout de l’accessibilité au restaurant et à l’hôtel via le formulaire d’inscription, découper l’adresse en plusieurs items (villes insérer dans une BDD remplie par Prestataire afin de l’utiliser dynamiquement et remplir la BDD) (Déborah)
- CSS/SASS (Andréa / Sarah / Benjamin)
- HTML (JSX) (Andréa / Sarah / Benjamin / Amel / Déborah)
- Accessibilité (Déborah)
- API : Google map (GMaps / <https://leafletjs.com/>), hôtel/restaurant (<https://developers.google.com/hotels?hl=fr>)

## La définition de la cible du projet (le public visé) : ça permettra entre autres choses d'anticiper certaines contraintes visuelles/ergonomiques/techniques

- Clients (accessibilité pour tous types de handicap.)

1. Voyageurs Aventureux : Ces ndividus recherchent des expériences uniques lors de leurs voyages. Ils ne veulent pas seulement une chambre d'hôtel ou un repas au restaurant ; ils veulent quelque chose qui les surprenne, qui leur offre une nouvelle perspective ou qui les challenge d'une manière ou d'une autre. Ils pourraient être particulièrement attirés par les "menus à l'aveugle" ou les séjours dans des hôtels qui offrent des expériences spéciales.

2. Couples : Que ce soit pour une escapade romantique, un anniversaire ou une autre occasion spéciale, de nombreux couples recherchent des expériences qui leur permettront de passer du temps de qualité ensemble. Un forfait comprenant une nuit d'hôtel avec un spa ou une expérience gastronomique pourrait être très attrayant pour eux.

3. Professionnels du Voyage : Cela pourrait inclure des personnes en déplacement professionnel cherchant à ajouter une touche spéciale à leur séjour ou des organisateurs d'événements qui cherchent des expériences uniques pour des clients ou des participants à des conférences.

4. Locaux Curieux : Même ceux qui vivent à proximité peuvent être intéressés par une "escapade" locale ou par l'exploration de la gastronomie de leur propre ville d'une manière nouvelle et surprenante.

5. Célébrations Spéciales : Les personnes qui cherchent à célébrer des occasions spéciales comme des anniversaires, des anniversaires de mariage, des enterrements de vie de jeune fille/garçon pourraient être attirées par les offres uniques de "Qualiextra".

6. Foodies et Passionnés de Gastronomie : Ceux qui sont toujours à la recherche de nouvelles expériences culinaires et qui aiment être surpris par des choix de menu innovants.

7. Amateurs de Bien-être : Des individus qui cherchent une évasion relaxante comprenant des expériences de spa, de méditation ou de bien-être en général.

8. Touristes de Luxe : Ceux qui recherchent des expériences haut de gamme et sont prêts à payer un prix premium pour des services et des expériences exclusifs.

- Prestataires de l’hôtellerie et de la restauration

## L'arborescence de l'application (le chemin utiltr/presta/admin)

- Homepage G
  - Bloc « Client »
    - 1ere connexion : Inscription
      - Créer un compte
        - Répondre au questionnaire / Filtrer les suggestions
          - Résultats/réponse du questionnaire
            - Espace client
    - 2eme connexion : Utilisateur
      - Se connecter
        - Bloc « Espace client »
          - Homepage Client (personnaliser la page d’accueil en fonction des critères (fonctionnalité))
            - Mes Résa
            - Notification
            - Liste de Favoris (services favoris)  
            - Page profil (Compte client) – (Gérer la modification des infos clients)
          - Filtre overlay (page ou modal)
  - Bloc « Réservation »
    - Pages de recherche
    - Panier
    - Page de confirmation
  - Bloc « Prestataire »
    - Homepage Presta
      - Création de compte ?
        - Ajouter un Établissement
          - Ajouter un Services
        - Liste des commandes
      - Liste des services
  - Bloc « Admin »
    - Log Admin
      - Homepage Admin
        - Validation des comptes prestataires ?
        - Liste des comptes Prestataires
        - Liste des comptes Clients
        - Listes de commandes (traçabilité entre les clients et les prestataires).

[arborescence en image](/img/Arborescence_Projet_Tuture.png)

## La liste des routes

### front prévues

- /
- /auth
  - /auth/register
  - /auth/logging
    - /user
      - /search
      - /search-result
      - /booking
      - /favorites
      - /dashboard
    - /provider
      - /service-list
      - /list-order
      - /add-property
      - /add-service
    - /admin
      - /add-provider
      - /list-order
      - /list-user
      - /list-provider
- /search
- /contact
- /how-it-work
- /referencing
- /help-customer
- /legal-notice
- /terms-conditions
- /privacy-policy
- /feedback
- /404
<!-- - /search/shoppingBag/logging -->
<!-- - /search/ shoppingBag/signIn -->

### Routes Back:/ (méthode ( get, post, put, delete) sur la même route  pour varier les actions)

[tableau des routes back](/img/tableau_back_1-4.png)
[tableau des routes back](/img/tableau_back_2-4.png)
[tableau des routes back](/img/tableau_back_3-4.png)
[tableau des routes back](/img/tableau_back_4-4.png)
