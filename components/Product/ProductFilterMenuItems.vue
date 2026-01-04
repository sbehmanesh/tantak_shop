<template>
  <v-list dense>
    <v-list-item @click.stop="handleAllClick">
      <v-list-item-title :class="itemClass(null)">همه محصولات</v-list-item-title>
    </v-list-item>

    <v-list-group
      v-for="(node, index) in categories"
      :key="`${node.id || node.slug}-${index}`"
      v-model="node.active"
      no-action
    >
      <template v-slot:activator>
        <v-list-item>
          <v-list-item-title :class="itemClass(node.id)" @click.stop="handleSelect(node)">
            {{ node.title }}
          </v-list-item-title>
        </v-list-item>
      </template>

      <v-list class="py-0 pr-2" v-if="node.sub_category && node.sub_category.length">
        <v-list-group
          v-for="(child, childIndex) in node.sub_category"
          :key="`${child.id || child.slug}-${childIndex}`"
          v-model="child.active"
          no-action
        >
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-title
                :class="itemClass(child.id)"
                @click.stop="handleSelect(child)"
              >
                {{ child.title }}
              </v-list-item-title>
            </v-list-item>
          </template>

          <v-list
            class="py-0 pr-7"
            v-if="child.sub_category && child.sub_category.length"
          >
            <v-list-item
              v-for="(grandchild, grandIndex) in child.sub_category"
              :key="`${grandchild.id || grandchild.slug}-${grandIndex}`"
              @click.stop="handleSelect(grandchild)"
            >
              <v-list-item-title :class="itemClass(grandchild.id)">
                {{ grandchild.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-list-group>
      </v-list>
    </v-list-group>
  </v-list>
</template>

<script>
export default {
  name: "ProductFilterMenuItems",
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    selectedId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  beforeMount() {
    if (Boolean(this.$route.query.filter_id)) {
      this.handleSelect(this.$route.query.filter_id);
      console.log("this.$route.query.filter_id >>> ", this.$route.query.filter_id);
    }
  },
  methods: {
    handleSelect(item) {
      this.$emit("select", item, true);
    },
    handleAllClick() {
      this.$emit("select", null, true);
    },
    itemClass(id) {
      const selected = this.normalizeId(this.selectedId);
      const current = this.normalizeId(id);
      const isActive = selected === current;
      return {
        "primary--text": isActive,
        "font-weight-medium": isActive,
      };
    },
    normalizeId(value) {
      if (value === null || value === undefined || value === "") {
        return null;
      }
      return String(value);
    },
  },
};
</script>
