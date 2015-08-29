import 'ace';
import 'ace/theme-github';
import 'ace/mode-javascript';

class MainController {

  const ACE_BASE_PATH = "libs/ace@1.2.0/";

  constructor() {
    this.initAce();
  }

  private initAce(): void {
    var editor = ace.edit("ec-ace-editor");
    ace.config.set("basePath", ACE_BASE_PATH);
    editor.setTheme("ace/theme/github");
    editor.getSession().setMode("ace/mode/javascript");
  }
}

export default MainController;
