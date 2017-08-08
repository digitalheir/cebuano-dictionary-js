export const stopwords = 
      ["ako","amua","ato","busa","ikaw","ila","ilang","imo","imong","iya","iyang","kaayo","kana","kaniya","kaugalingon","kay","kini","kinsa","kita","lamang","mahimong","mga","mismo","nahimo","nga","pareho","pud","sila","siya","unsa"]
;      
const source = new Set([
"ako", // i, me, myself
"kita", // we
"amua", // our
"ato", // ours
// "", // ourselves
"ikaw", // you
"imong", // your
"imo", // yours
"iyang", // -self
"kaugalingon", // -self
// "kamo mismo", // -selves
"siya", // he, she, him
"iya", // his, hers, own
"kaniya", // her

"kini", // it, its
"mismo", // itself
"sila", // they, them
"ila", // their, theirs
"ilang", // them
"unsa", // what
"nga", // which
"kinsa", // who, whom
"kini", // this, these
"kana", // that

"mga", // those
// "", // is
// "", // are
// "", // was // kaniadto?
// "", // were // kaniadto?
"mahimong", // be
"nahimo", // been
"", // being
"", // have
"", // has
"", // had
"", // having
"", // do
"", // does
"", // did
"", // doing
"", // would
"", // should
"", // could
"", // ought
"", // i'm
"", // you're
"", // he's
"", // she's
"", // it's
"", // we're
"", // they're
"", // i've
"", // you've
"", // we've
"", // they've
"", // i'd
"", // you'd
"", // he'd
"", // she'd
"", // we'd
"", // they'd
"", // i'll
"", // you'll
"", // he'll
"", // she'll
"", // we'll
"", // they'll
"", // isn't
"", // aren't
"", // wasn't
"", // weren't
"", // hasn't
"", // haven't
"", // hadn't
"", // doesn't
"", // don't
"", // didn't
"", // won't
"", // wouldn't
"", // shan't
"", // shouldn't
"", // can't
"", // cannot
"", // couldn't
"", // mustn't
"", // let's
"", // that's
"", // who's
"", // what's
"", // here's
"", // there's
"", // when's
"", // where's
"", // why's
"", // how's
"", // a
"", // an
"", // the
"", // and
"", // but
"", // if
"", // or
"", // because
"", // as
"", // until
"", // while
"", // of
"", // at
"", // by
"", // for
"", // with
"", // about
"", // against
"", // between
"", // into
"", // through
"", // during
"", // before
"", // after
"", // above
"", // below
"", // to
"", // from
"", // up
"", // down
"", // in
"", // out
"", // on
"", // off
"", // over
"", // under
"", // again
"", // further
"", // then
"", // once
"", // here
"", // there
"", // when
"", // where
"", // why
"", // how
"", // all
"", // any
"", // both
"", // each
"", // few
"", // more
"", // most
"", // other
"", // some
"", // such
"", // no
"", // nor
"", // not
"lamang", // only
"pareho", // same
"busa", // so
"kay", // than
"pud", // too
"kaayo", // very
]);
