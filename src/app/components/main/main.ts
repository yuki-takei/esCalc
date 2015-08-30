/// <reference path="../../model/result.ts"/>

import 'ace';
import 'ace/theme-github';
import 'ace/mode-javascript';

import {Result, ResultSet} from 'app/model/result';

class MainController {

  static ACE_BASE_PATH: String = "libs/ace@1.2.0/";

  /**
   * DI
   * @type {ng.IScope}
   */
  private scope: ng.IScope;

  public resultSets: ResultSet[] = [];
  private activeResultSet: ResultSet;

  constructor($scope: ng.IScope) {
    this.scope = $scope;

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

  /**
   * insert a end-of-line to current position
   * @param {AceAjax.Editor} editor instance
   */
  private insertNewLine(editor: AceAjax.Editor): void {
    var currentPos: AceAjax.Position = editor.getCursorPosition();
    editor.getSession().getDocument().insertMergedLines(currentPos, ['', '']);
  }

  private getActiveResultSet(): ResultSet {
    if (this.activeResultSet == null) {
      this.activeResultSet = new ResultSet();
      this.resultSets.push(this.activeResultSet);
    }
    return this.activeResultSet;
  }

  private evalAll(editor: AceAjax.Editor): void {
    // TODO implements
    var lastLineNum = 10;
    this.evalSelectedLines(editor, 0, lastLineNum);
  }

  private evalSelectedLines(editor: AceAjax.Editor, startLineNum: number, endLineNum: number): void {
    var resultSet: ResultSet = new ResultSet();
    // eval start to end
    for (var i=startLineNum; i<=endLineNum; i++) {
      var result: Result = this.evalLine(editor, i);
      if (result != null) {
        resultSet.addResult(result);
      };
    }

    // store resultSet
    this.resultSets.push(resultSet);
    // reset active
    this.activeResultSet = null;

    // apply
    this.scope.$apply(<any> this.resultSets);
  }

  private evalCurrentLine(editor: AceAjax.Editor): void {
    var currentPos: AceAjax.Position = editor.getCursorPosition();
    var lineNum: number = currentPos.row;

    // eval
    var result: Result = this.evalLine(editor, lineNum);

    if (result != null) {
      this.getActiveResultSet().addResult(result);
      // apply
      this.scope.$apply(<any> this.resultSets);
    }
  }

  private evalLine(editor: AceAjax.Editor, lineNum: number): Result {
    var line: String = editor.getSession().getLine(lineNum);
    return this.eval(line);
  }

  private eval(line: String): Result {
    line = line.trim()

    // return null if empty
    if (line === "") {
      return null;
    }

    var resultStr = eval(line.toString());
    return <Result> { input: line, output: resultStr };
  }

  private enterHandler(editor: AceAjax.Editor): void {
    console.log("Enter");

    this.evalCurrentLine(editor);

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
