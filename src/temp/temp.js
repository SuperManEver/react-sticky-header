!(function () {
  try {
    (function (e) {
      (n.prototype = {
        attachNodes: function (t) {
          (this.nodes.el = t),
            (this.nodes.current = t.querySelector(
              '.legouser__current-account',
            )),
            (this.nodes.popup = t.querySelector('.legouser__popup')),
            (this.nodes.ticker = t.querySelector('.ticker')),
            (this.nodes.tickerValue = t.querySelector('.ticker__value')),
            (this.nodes.multiTemplate = t.querySelector(
              '.user-account_template_yes',
            )),
            (this.nodes.multiContainer = t.querySelector(
              '.legouser__accounts-container',
            ));
        },

        open: function () {
          if (this.params.scope) {
            var t =
              this.nodes.current.getBoundingClientRect().top +
              e.document.documentElement.scrollTop +
              4;
            this.nodes.popup.style.top = t + 'px';
          }
          this.nodes.popup.classList.add('light-popup_visible_yes'),
            this.setHeight(),
            this.addDocumentEvent(),
            this.addScrollEvent(),
            (this.opened = !0);
        },
        close: function () {
          this.removeScrollEvent(),
            this.nodes.popup.classList.remove('light-popup_visible_yes'),
            (this.opened = !1);
        },
        addScrollEvent: function () {
          (this.onWindowScrollBind = this.onWindowScroll.bind(this)),
            e.addEventListener('scroll', this.onWindowScrollBind);
        },
        removeScrollEvent: function () {
          e.removeEventListener('scroll', this.onWindowScrollBind);
        },
        onWindowScroll: function () {
          -10 > this.nodes.popup.getBoundingClientRect().top && this.close();
        },
        onDocumentClick: function (t) {
          t.isOpeningEvent ||
            this.nodes.popup.contains(t.target) ||
            (t.preventDefault(), this.removeDocumentEvent(), this.close());
        },
        setHeight: function () {
          var t = this.nodes.popup.offsetHeight;

          if (t) {
            var n = this.nodes.popup.getBoundingClientRect().top;
            var o = e.innerHeight - n - 5;

            if (t > o) {
              var s = this.nodes.popup.querySelector('.legouser__menu');
              (s.style.maxHeight = o + 'px'), (s.style.overflowY = 'scroll');
            }
          }
        },
        _fetchCounter: function () {
          var t = this,
            n = 'https://mail.yandex.'.concat(
              this.params._tld,
              '/api/v2/serp/counters?silent',
            ),
            o = new e.XMLHttpRequest();
          o.open('GET', n),
            (o.withCredentials = !0),
            (o.onload = function (e) {
              if (200 === e.currentTarget.status) {
                var n = JSON.parse(e.currentTarget.response);
                if (n && n.counters && n.counters.unread) {
                  var o = n.counters.unread,
                    s = t.nodes,
                    i = s.tickerValue,
                    r = s.ticker,
                    a = t.nodes.popup.querySelector('.legouser__menu-counter');
                  a &&
                    ((a.textContent = o),
                    a.classList.remove('legouser__menu-counter_state_empty')),
                    (i.textContent = 99 < o ? 99 : o),
                    i.setAttribute('title', o),
                    r.classList.remove('ticker_state_empty');
                }
              }
            }),
            o.send();
        },

        onFetchAccountsFinish: function (t) {
          this.setMultiAccounts(t || []);
        },

        _renderAccount: function (n, s, i) {
          var r,
            a = n.defaultEmail || n.displayName.social,
            c = this.params._isInternal
              ? n.login
              : n.displayName.default_avatar,
            u = i.cloneNode(!0),
            d = {
              legouser__account: {
                uid: n.uid,
                pos: s,
              },
            };
          return (
            (a = 'object' === t(a) ? o[a.provider] : a),
            u.setAttribute('data-bem', JSON.stringify(d)),
            u.setAttribute(
              'data-count',
              JSON.stringify({
                name: 'user-menu',
                id: 'switch-user',
              }),
            ),
            u.classList.add('count-me'),
            u.classList.remove('user-account_template_yes'),
            (u.querySelector('.user-account__name-text').textContent =
              n.displayName.name),
            a &&
              (u.classList.add('user-account_has-subname_yes'),
              (u.querySelector('.user-account__subname').textContent = a)),
            this._setAvatar(
              u.querySelector('.user-pic__image'),
              this._getAvatarUrls(c),
            ),
            this.params._loggedByLink
              ? (r = e.document.createElement('a')).setAttribute(
                  'href',
                  this._createLoggedAccountLink(n.uid),
                )
              : (r = e.document.createElement('div')),
            (r.className = 'menu__item'),
            r.appendChild(u),
            r
          );
        },

        _setAvatar: function (t, e) {
          t.setAttribute('src', e.low),
            t.setAttribute(
              'srcSet',
              ''.concat(e.low, ' 1x, ').concat(e.high, ' 2x'),
            );
        },
        pickFromJson: function (t, e) {
          var n = {};
          try {
            n = JSON.parse(t);
          } catch (t) {}
          return e && n[e] ? n[e] : n;
        },
      }),
        (e.Lego = e.Lego || {}),
        (e.Lego.User2Class = n);
    })(window),
    
   
})();
