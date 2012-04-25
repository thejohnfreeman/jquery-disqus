This [jQuery][jq] plugin enhances your [Disqus][dq] comments with Markdown and
syntax highlighting.

It was branched off the last published version of the [jQuery Disqus plugin
by Lance Pollard][lance]. Besides being broken by the time I discovered it
(likely due to changes in the Disqus API), I believe the original plugin
tried to do too much. I have made several changes:

- Use a single entry point, `$.disqus()`.
- Expect Disqus configuration to occur outside the call to this plugin and
  to follow the expectations documented by [Disqus][dq-config].
- Use Disqus's published Universal Code instead of a custom AJAX call.
- Support Markdown conversion using [Showdown][sd].
- Support syntax highlighting with [Prettify][pretty].
- Remove everything else, e.g. `ready()` and `add()`.

[lance]: http://code.lancepollard.com/jquery-disqus-plugin "jQuery Disqus plugin"
[jq]: http://jquery.com/ "jQuery, a JavaScript library for DOM manipulation"
[dq]: http://disqus.com/ "Disqus, a comment app for blogs"
[dq-config]: http://docs.disqus.com/help/2/ "JavaScript configuration variables"
[sd]: https://github.com/coreyti/showdown "Showdown, a JavaScript port of Markdown"
[pretty]: http://code.google.com/p/google-code-prettify/ "Prettify, a JavaScript- and CSS-based syntax highlighter"

