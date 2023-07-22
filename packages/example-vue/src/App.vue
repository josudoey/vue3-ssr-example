<template lang="pug">
router-view(v-slot="{ Component }")
  component(:is="Component")
</template>
