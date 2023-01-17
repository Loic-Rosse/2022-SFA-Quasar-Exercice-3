// State : données du magasin
import { uid } from 'quasar'

const state = {
  // TODO renommer en plats
  taches: [
    {
      id: 1,
      image: 'https://i.imgur.com/0umadnY.jpg',
      nom: 'Burger',
      description: "Un hamburger est un sandwich composé d'une ou plusieurs tranches de viande hachée, généralement du bœuf, placées dans un petit pain ou une brioche.",
      note: 4
    },
    {
      id: 2,
      image: 'https://i.imgur.com/b9zDbyb.jpg',
      nom: 'Pizza',
      description: "La pizza est un plat savoureux d'origine italienne, consistant en une base généralement ronde et aplatie de pâte levée à base de blé.",
      note: 5
    },
    {
      id: 3,
      image: 'https://i.imgur.com/RbKjUjB.jpg',
      nom: 'Petits choux',
      description:
        'Le chou de Bruxelles est une variété de chou, plante herbacée de la famille des Brassicaceae. C’est vraiement pas bon...',
      note: 1
    },
    {
      id: 4,
      image: 'https://i.imgur.com/xAuhNVg.jpg',
      nom: 'BBQ Ribs',
      description: 'Les BBQ ribs ou barbecue ribs sont des grands classiques très appréciés partout dans le monde.',
      note: 5
    }
  ]
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  // TODO renommer les mutations en majuscule supprimerPlat => SUPPRIMER_PLAT
  supprimerPlat (state, id) {
    // Recherche le plat et retourne sa position dans le tableau, son index
    state.taches = state.taches.filter(el => el.id !== id)
  },
  ajouterPlat (state, plat) {
    state.taches.push(plat)
  },
  modifierPlat (state, plat) {
    const index = state.taches.findIndex(el => el.id === plat.id)
    console.log(index, typeof plat.id)
    // Si une tâche a été trouvée
    if (index !== -1) {
      // Modifie l'objet trouvé avec les nouvelles valeurs
      Object.assign(state.taches[index], plat)
    }
  }
}

/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  supprimerPlat ({ commit }, id) {
    // Valide la mutation et y passe les données
    commit('supprimerPlat', id)
  },
  ajouterPlat ({ commit }, plat) {
    plat.id = uid()
    commit('ajouterPlat', plat)
  },
  modifierPlat ({ commit }, plat) {
    commit('modifierPlat', plat)
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {
  // Prend le state comme 1er paramètre
  // TODO trier les retour des getters
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  // https://usefulangle.com/post/227/javascript-sort-array-of-objects
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
  taches: (state) => {
    // return [...state.taches].sort(function (a, b) { return a.note - b.note })
    // return [...state.taches].sort((a, b) => a.nom > b.nom)
    return [...state.taches].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
  }
}

/*
Exporte les constantes, variables du fichier
On pourra ainsi les récupérer, les importer dans un autre fichier JS.

namespace: true, ajoute un namespace à notre objet retourné.
 */
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
