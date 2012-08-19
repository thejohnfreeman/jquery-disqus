/**
 * jQuery Disqus Plugin
 *
 * Copyright (c) 2010 Lance Pollard (@viatropos)
 * Edited by John Freeman (@thejohnfreeman)
 * Licensed under the MIT (MIT-LICENSE.txt)
 * Based off Rob Loach's jquery disqus plugin (http://robloach.net)
 */
(function($) {

  //var wrapRawText = function wrapRawText(str) {
    //var result = document.createElement("textarea");
    //result.value = str;
    //result.className = "dsq-source";
    //return result;
  //};
  
  var fixDisqus = function fixDisqus(elt) {
    /* Disqus tries to prettify links. Replace every anchor with the
     * contents of its `href` attribute, and pray the user didn't write
     * their own anchor. */
    $("a", elt).replaceWith(function () { return $(this).attr("href"); });

    /* Convert <br> to newline before passing through Showdown. */
    return elt
      .children()
      .map(function () { return $(this).html().replace(/<br\/?>/g, "\n"); })
      .get()
      .join("\n\n");
  };

  var transformComments = function transformComments(comments, options) {
    if (options.markdown && Attacklab) {
      var converter = new Attacklab.showdown.converter();
      comments.each(function () {
        var comment = $(this);
        //var source = comment.html();

        var md = fixDisqus(comment);
        comment.html(converter.makeHtml(md));

        /* Use textarea to decode entities while preserving tags. */
        var decoder = document.createElement("textarea");

        /* Decode entities only in <code> blocks. */
        $("code", comment).each(function () {
          decoder.innerHTML = $(this).html();
          $(this).html(decoder.value);
        });

        //comment.append(wrapRawText(source));
        //comment.append(wrapRawText(md));
      });
    }

    if (options.prettify) {
      comments.each(function () {
        /* Add the prettyprint class to every <pre> and <code> in the
         * comment. */
        $("pre", this).addClass("prettyprint");;
        $("code", this).addClass("prettyprint");;
        prettyPrint();
      });
    }
  };
  
  /* We expect that this function is only ever called once in a page.
   * Disqus does not officially support multiple threads on a page. */
  $.disqus = function jQueryDisqus(options) {
    options = options || {};

    /* Merge in the default options. */
    options = $.extend({
      markdown: true,
      prettify: true,
      show_count: false,
      interval: 100 // how often we should check to see if disqus is ready
    }, options);

    /* TODO: Automatically load dependencies (Showdown, Prettify) instead of
     * requiring <scripts> in the <head>? */

    /* Use the Disqus universal code, unedited. That way if it doesn't work,
     * we can blame them. */
    (function() {
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();

    var poller = setInterval(function () {
      if (!$("#dsq-comments").length) return;
      clearInterval(poller);
      var comments = $(".dsq-comment-text");
      transformComments(comments, options);
    }, options.interval);
  };

})(jQuery);

