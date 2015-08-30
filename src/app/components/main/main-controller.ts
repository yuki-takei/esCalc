import 'ace';
import 'ace/theme-github';
import 'ace/mode-javascript';


class MainController {
  static ACE_BASE_PATH: String = "libs/ace@1.2.0/";

  constructor() {
    this.initAce();
  }

  private initAce(): void {
    var thisObj: MainController = this;

    var editor: AceAjax.Editor = ace.edit("ec-ace-editor");
    ace.config.set("basePath", MainController.ACE_BASE_PATH);
    editor.setTheme("ace/theme/github");
    editor.getSession().setMode("ace/mode/javascript");

    editor.commands.addCommands([
      // bind to Enter
      <AceAjax.EditorCommand> {
        name: 'enterCommand',
        bindKey: {win: 'Enter',  mac: 'Enter'},
        exec: function(editor: AceAjax.Editor) {
          thisObj.enterHandler(editor);
        },
        readOnly: false
      },
      // bind to Shift+Enter
      <AceAjax.EditorCommand> {
        name: 'shiftEnterCommand',
        bindKey: {win: 'Shift+Enter',  mac: 'Shift+Enter'},
        exec: function(editor: AceAjax.Editor) {
          thisObj.shiftEnterHandler(editor);
        },
        readOnly: false
      },
      // bind to Ctrl+Enter
      <AceAjax.EditorCommand> {
        name: 'ctrlEnterCommand',
        bindKey: {win: 'Ctrl+Enter',  mac: 'Cmd+Enter'},
        exec: function(editor: AceAjax.Editor) {
          thisObj.ctrlEnterHandler(editor);
        },
        readOnly: false
      }
    ]);
  }

  private insertNewLine(editor: AceAjax.Editor): void {
    var currentPos = editor.getCursorPosition();
    editor.getSession().getDocument().insertMergedLines(currentPos, ['', '']);
  }

  private enterHandler(editor: AceAjax.Editor): void {
    console.log("Enter");

    // TODO evaluate current line

    this.insertNewLine(editor);
  }

  private shiftEnterHandler(editor: AceAjax.Editor): void {
    this.insertNewLine(editor);
  }

  private ctrlEnterHandler(editor: AceAjax.Editor): void {
    console.log("Ctrl + Enter");

    // TODO evaluate all
  }

}

export default MainController;
