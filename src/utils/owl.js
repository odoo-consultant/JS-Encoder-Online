/**
 * 组装owl的方法
 * @returns {String}
 */
function composeOwlClosure (js, xmlTemplate) {
    const sanitizedXML = xmlTemplate.replace(/<!--[\s\S]*?-->/g, "").replace(/`/g, '\\\`')
    return `
      (async function(TEMPLATES) {
        ${js}
      })(\`${sanitizedXML}\`)`;

}

export {
  composeOwlClosure
}