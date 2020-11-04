<template>
  <form @submit.prevent="store">
    <ckeditor :editor="editor" v-model="content" :config="editorConfig" />
  </form>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@/plugins/ckeditor5-build-classic";
import UploadAdapter from "@/components/Aktuality/UploadAdapter";
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import "@ckeditor/ckeditor5-build-classic/build/translations/cs";

export default {
  data() {
    return {
      initialPhase: true,
      //   content: "<p></p>",
      editor: ClassicEditor,
      // plugins: [Image, ImageResize],
      editorConfig: {
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "|",
          "insertTable",
          "|",
          "imageUpload",
          "mediaEmbed",
          "|",
          "undo",
          "redo",
        ],
        table: {
          toolbar: ["tableColumn", "tableRow", "mergeTableCells"],
        },
        extraPlugins: [this.uploader],
        language: "cs",
        // plugins: [Bold, Italic],
      },
    };
  },

  props: ["contentInitial"],

  methods: {
    store() {
      // Some code
    },

    uploader(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        console.log(loader);
        return new UploadAdapter(loader);
      };
    },
  },

  computed: {
    content: {
      set(value) {
        this.$store.dispatch("setPostContent", value);
      },
      get() {
        return this.$store.getters.getPostContent;
      },
    },
  },

  components: {
    ckeditor: CKEditor.component,
  },

  watch: {},

  created() {},
};
</script>