const instance = {
  setConsoleH: (state, height) => {
    state.consoleH = height
  },
  setIframeH: (state, height) => {
    state.iframeH = height
  },
  setEditorW: (state, width) => {
    state.editorW = width
  },
  setTopEditorH: (state, height) => {
    state.topEditorH = height
  },
  setBottomEditorH: (state, height) => {
    state.bottomEditorH = height
  },
  setIframeW: (state, width) => {
    state.iframeW = width
  },
  setPrep: (state, obj) => {
    const { index, newPrep } = obj
    state.prep.splice(index, 1, newPrep)
  },
  setAllPrep: (state, newPrep) => {
    state.prep = newPrep
  },
  setCurTab: (state, tab) => {
    state.curTab = tab
  },
  setTopPrep: (state, newPrep) => {
    state.topPrep = newPrep
  },  
  setBottomPrep: (state, newPrep) => {
    state.bottomPrep = newPrep
  },
  setLastTopTab: (state, tab) => {
    state.lastTopTab = tab
  },
  setLastBottomTab: (state, tab) => {
    state.lastBottomTab = tab
  },    
  setMdToolbarVisible: (state, visible) => {
    state.mdToolbarVisible = visible
  },
  setInstanceCode: (state, content) => {
    state.instanceCode[content.mode] = content.code
  },
  setInstancesCode: (state, codeObj) => {
    state.instanceCode = Object.assign({}, codeObj)
  },
  setInstanceSetting: (state, attr) => {
    state.instanceSetting[attr.name] = attr.value
  },
  setAllInstanceSetting: (state, obj) => {
    state.instanceSetting = obj
  },
  setInstanceExtLinks: (state, attr) => {
    state.instanceExtLinks[attr.name] = attr.list
  },
  setAllInstanceExtLinks: (state, obj) => {
    state.instanceExtLinks = obj
  },
  setIframeSVisible: (state, visible) => {
    state.iframeSVisible = visible
  },
  setIframeHVisible: (state, visible) => {
    state.iframeHVisible = visible
  },
  setIframeWVisible: (state, visible) => {
    state.iframeWVisible = visible
  },
  setResolveHTML: (state, status) => {
    state.resolveHTML = status
  },
  setConsoleSettings: (state, setting) => {
    state.consoleSettings = setting
  },
  setConsoleInfo: (state, logs) => {
    state.consoleInfo = logs
  },
  setConsoleInfoCount: (state, count) => {
    state.consoleInfoCount = count
  },
  setCompiledCode: (state, code) => {
    state.compiledCode = code
  },
  setCurInstanceDetail: (state, detail) => {
    state.curInstanceDetail = Object.assign({}, state.curInstanceDetail, detail)
  },
  setIframeInit: (state, isInit) => {
    state.iframeInit = isInit
  },
  setHasUploadCode: (state, status) => {
    state.hasUploadCode = status
  },
  setShouldResetCode: (state, status) => {
    state.shouldResetCode = status
  }
}

export default instance