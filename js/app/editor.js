import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';

export class Editor {
  constructor(parent) {
    this._update = [];
    this._parent = parent;

    const $ = this;

    this._editor = new EditorView({
      extensions: [basicSetup, keymap.of([indentWithTab]), markdown(), oneDark],
      parent,
      dispatch(tr) {
        this.update([tr]);
        if ($._update.length && !tr.changes.empty) {
          for (const cb of $._update) {
            cb(this.state.doc.toString());
          }
        }
      },
      lineWrapping: true,
    });
  }

  setTheme(mode) {
    const $ = this;

    const extensions = [basicSetup, keymap.of([indentWithTab]), markdown()];

    if (mode === 'night') {
      extensions.push(oneDark);
    }

    const content = this._editor.state.doc.toString();
    this._editor.dom.remove();

    this._editor = new EditorView({
      extensions,
      parent: this._parent,
      dispatch(tr) {
        this.update([tr]);
        if ($._update.length && !tr.changes.empty) {
          for (const cb of $._update) {
            cb(this.state.doc.toString());
          }
        }
      },
      lineWrapping: true,
    });

    this.setContent(content);
  }

  setContent(content) {
    this._editor.dispatch({
      changes: {
        from: 0,
        to: this._editor.state.doc.toString().length,
        insert: content,
      },
    });
  }

  content() {
    return this._editor.state.doc.toString();
  }

  onUpdate(fn) {
    this._update = this._update.concat([fn]);
  }
}
