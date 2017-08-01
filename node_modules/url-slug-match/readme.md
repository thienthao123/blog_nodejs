# url-slug-match

> Convert a dot/underscore/space separated string to string with hyphen and lower case. Good for SEO.


## Install

```
$ npm install --save url-slug-match
```


## Usage

```js
const urlSlugMatch = require('url-slug-match');

urlSlugMatch('foo_bar');
//=> 'foo-bar'

urlSlugMatch('8.Foo-Bar');
//=> '8-foo-bar'

urlSlugMatch('--foo.bar');
//=> 'foo-bar'

urlSlugMatch('__foo__bar__');
//=> 'foo-bar'

urlSlugMatch('foo bar');
//=> 'foo-bar'

urlSlugMatch('foo', 'bar');
//=> 'foo-bar'

urlSlugMatch('__foo__', '--bar');
//=> 'foo-bar'
```


## License

MIT © [Rohit Singhal](https://www.xtendify.com/en/user/2-rosinghal)