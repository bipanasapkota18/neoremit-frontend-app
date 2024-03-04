declare module "@ckeditor/ckeditor5-react" {
  import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
  import { EditorConfig } from "@ckeditor/ckeditor5-core/src/editor/editorconfig.d.ts";
  import Event from "@ckeditor/ckeditor5-utils/src/eventinfo";
  import * as React from "react";
  const CKEditor: React.FunctionComponent<{
    disabled?: boolean;
    editor: typeof ClassicEditor;
    data?: string;
    id?: string;
    config?: EditorConfig;
    onReady?: (editor: ClassicEditor) => void;
    onChange?: (event: Event, editor: ClassicEditor) => void;
    onBlur?: (event: Event, editor: ClassicEditor) => void;
    onFocus?: (event: Event, editor: ClassicEditor) => void;
    onError?: (event: Event, editor: ClassicEditor) => void;
  }>;
  export { CKEditor, ClassicEditor };
}

declare module "@ckeditor/ckeditor5-build-classic" {
  type CKWriter = {
    setStyle: (
      attribute: string,
      attributeValue: string,
      root: HTMLElement
    ) => void;
  };

  export default class ClassicEditor extends React.Component {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public getData(): string {}
    public editing = {
      view: {
        document: {
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          getRoot(): HTMLElement {}
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
        change: (event: (writer: CKWriter) => void) => {}
      }
    };
  }
}
