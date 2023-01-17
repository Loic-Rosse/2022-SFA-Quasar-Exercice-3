<template>
  <q-card
    class="card">
    <!-- TODO ajouter image par défaut -->
    <q-img
      :src="plat.image ? plat.image : 'https://picsum.photos/200/300'"
      basic
      contain
    >
      <div class="absolute-bottom text-h6">
        {{ plat.nom }}
      </div>
    </q-img>

    <q-card-section>
      <q-rating
        readonly
        :model-value="plat.note"
        size="2em"
        color="orange"
        class="q-mt-sm"
      />
    </q-card-section>

    <q-card-section class="description">
      <span v-if="plat.description">{{ plat.description }}</span>
      <span class="text-italic" v-else>Aucune descripion fournie.</span>
    </q-card-section>

    <q-card-actions
      class="absolute-bottom"
      align="right">
      <q-btn
        @click="afficherFormPlat = true"
        icon="edit"
        color="blue"
        flat>Modifier
      </q-btn>
      <q-btn
        @click="dialogSupprimer()"
        icon="delete"
        color="red"
        flat>Supprimer</q-btn>
    </q-card-actions>

    <q-dialog
      v-model="afficherFormPlat">
      <form-plat
        action="modifier"
        :platAModifier="plat"
        @close="afficherFormPlat = false" />
    </q-dialog>

  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['plat'],
  data () {
    return {
      afficherFormPlat: false
    }
  },
  methods: {
    ...mapActions('Plats', ['supprimerPlat']),
    dialogSupprimer () {
      this.$q.dialog({
        title: 'Supprimer plat',
        message: 'Voulez-vous supprimer ce plat ?',
        persistent: true,
        ok: {
          label: 'Supprimer'
        },
        cancel: {
          label: 'Annuler',
          color: 'grey'
        }
      }).onOk(() => {
        this.supprimerPlat(this.plat.id)
      })
    }
  },
  components: {
    'form-plat': require('components/FormPlat.vue').default
  }
}
</script>

<style>
.card {
  min-height: 400px;
  max-width: 250px;
  width: 250px;
  transition: background 0.3s;
}
.card-clickable {
  cursor: pointer;
}
.card-clickable:hover {
  background: #bdbdbd!important;
}
.card .q-img {
  max-height: 180px;
}
.card .q-img__image {
  background-size: cover !important;
}
.card .q-rating__icon {
  opacity: 0.2;
}
.card .q-rating__icon--active {
  opacity: 1;
}
.card .description {
  padding: 5px 16px;
}
</style>
