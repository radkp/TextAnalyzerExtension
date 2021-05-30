function init() {
  console.log("Initializing SWAX");
  var link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Garamond&display=swap');
  document.head.appendChild(link);

  changeText();
  timeout = setTimeout('init()', 15000);
}


function changeText() {
  var text = [];

  $('span.kix-lineview-text-block').each(function(i, obj){
         text[i] = $(obj).text();
  });

  $.ajaxSetup({
     async: false,
     headers:{
      'Content-type': "text/plain"
     }
  });
  var url = "https://afyoq9ukvk.execute-api.ca-central-1.amazonaws.com/default/analyzetext";
  var msg = '';
  $.post(url,   // url
        text.join(' '), // data to be submit
        function(data, status, jqXHR) {
        $.each(data, function(key, cs) {
           $.each(cs, function(k, v) {
              msg += 'Complex sentence: ' + v.complexSentence + '<br>';
              msg += 'Total Words: ' + v.readabilityAnalysis.totalWords + '<br>';
              if(v.complexWords) {
                msg += 'Complex Words: ' + v.complexWords.join(',') + '<br>';
              }
              msg += 'Flesch Score: ' + v.readabilityAnalysis.fleschScore + '<br>';
              msg += 'Feedback: ' + v.readabilityAnalysis.improvementSuggestion + '<br>';
              msg += '<i>_____________________</i><br>'
           });
        });
  });

  var baseTag = '<div class="ghanshyam docos-anchoredreplyview docos-replyview-first docos-replyview-comment badging-enabled-doco"><div class="docos-collapsible-replyview"><div class="docos-replyview-static"><div class="docos-replyview-body docos-anchoredreplyview-body" dir="ltr" style="text-align: left;">' + msg + '</div></div></div><div class="docos-edit-pane-placeholder" style="display: none"></div><div class="docos-replyview-origin docos-anchoredreplyview-origin" style="display: none;"></div></div>';

  $('.ghanshyam').remove();
  $(".docos").prepend(baseTag);
}


init();

