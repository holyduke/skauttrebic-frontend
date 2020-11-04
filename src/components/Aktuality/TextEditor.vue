<template>
  <form @submit.prevent="store">
    <ckeditor
      :editor="editor"
      v-model="content"
      :config="editorConfig"
    />
  </form>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadAdapter from "@/components/Aktuality/UploadAdapter";
import "@ckeditor/ckeditor5-build-classic/build/translations/cs";

export default {
  data() {
    return {
      editor: ClassicEditor,
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
      },
    };
  },

  methods: {
    store() {
      // Some code
    },

    uploader(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
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
};
</script>


