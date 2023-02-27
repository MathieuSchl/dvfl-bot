function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function setActivity(client) {
  const random = getRandomInt(21);
  switch (random) {
    case 0:
      client.user.setActivity("Bienvenue sur le serveur du DVFL");
    case 1:
      client.user.setActivity("Recherche le saint-tournevis");
    case 2:
      client.user.setActivity("Répare une mini-prusa");
    case 3:
      client.user.setActivity("Relit la formation SRG");
    case 4:
      client.user.setActivity("Range le bordel des PIX");
    case 5:
      client.user.setActivity("Tri des résistances");
    case 6:
      client.user.setActivity("Débouche une buse");
    case 7:
      client.user.setActivity("Change la mèche d'une perceuse");
    case 8:
      client.user.setActivity("Nettoie un plateau de MK3");
    case 9:
      client.user.setActivity("Jette le MMU2S par la fenêtre");
    case 10:
      client.user.setActivity("Regarde les pièces demandées par les PIX");
    case 11:
      client.user.setActivity("Écrit une nouvelle formation");
    case 12:
      client.user.setActivity("Crée le prochain event");
    case 13:
      client.user.setActivity("Crée le prochain post insta");
    case 14:
      client.user.setActivity("Passe le balai dans le FabLab");
    case 15:
      client.user.setActivity("Utilise la perceuse à colonne");
    case 16:
      client.user.setActivity("Range les pinces plates");
    case 17:
      client.user.setActivity("Cherche un STL sur Thingiverse");
    case 18:
      client.user.setActivity("Prépare le prochain cours EMLV");
    case 19:
      client.user.setActivity("Range les clés allen");
    case 20:
      client.user.setActivity("Utilise la découpeuse laser");

    default:
      client.user.setActivity("Bienvenue sur le serveur du DVFL");
  }
}

module.exports.run = async (client) => {
  setActivity(client);
  setInterval(() => {
    setActivity(client);
  }, 60 * 1000);
};
