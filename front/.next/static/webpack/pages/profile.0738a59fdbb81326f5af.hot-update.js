webpackHotUpdate_N_E("pages/profile",{

/***/ "./components/AppLayout.js":
/*!*********************************!*\
  !*** ./components/AppLayout.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../reducers */ "./reducers/index.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__);
var _jsxFileName = "C:\\Users\\swcha\\Desktop\\S06P21C206-master\\front\\components\\AppLayout.js",
    _this = undefined,
    _s = $RefreshSig$();










var Header = antd__WEBPACK_IMPORTED_MODULE_3__["Layout"].Header,
    Content = antd__WEBPACK_IMPORTED_MODULE_3__["Layout"].Content,
    Footer = antd__WEBPACK_IMPORTED_MODULE_3__["Layout"].Footer;
var SearchInput = Object(styled_components__WEBPACK_IMPORTED_MODULE_4__["default"])(antd__WEBPACK_IMPORTED_MODULE_3__["Input"].Search).withConfig({
  displayName: "AppLayout__SearchInput",
  componentId: "sc-ngssuz-0"
})(["vertical-align:middle;"]);
_c = SearchInput;
var SiteLayoutContent = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "AppLayout__SiteLayoutContent",
  componentId: "sc-ngssuz-1"
})(["min-height:280px;padding:24px;background:#fff;"]);
_c2 = SiteLayoutContent;
var MovingLogo = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].img.withConfig({
  displayName: "AppLayout__MovingLogo",
  componentId: "sc-ngssuz-2"
})(["float:left;width:120px;height:31px;margin:16px 24px 16px 0;cursor:pointer;"]);
_c3 = MovingLogo;

var AppLayout = function AppLayout(_ref) {
  _s();

  var children = _ref.children;
  var isLoggedIn = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useSelector"])(function (state) {
    return state.user.isLoggedIn;
  });
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useDispatch"])();
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])("div", {
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(antd__WEBPACK_IMPORTED_MODULE_3__["Layout"], {
      className: "layout",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(Header, {
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
          href: "/",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(MovingLogo, {
            src: "/img/moving.png"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 38,
            columnNumber: 13
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 37,
          columnNumber: 11
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(antd__WEBPACK_IMPORTED_MODULE_3__["Menu"], {
          theme: "dark",
          mode: "horizontal",
          defaultSelectedKeys: ['3'],
          children: [isLoggedIn ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["Fragment"], {
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(antd__WEBPACK_IMPORTED_MODULE_3__["Menu"].Item, {
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
                href: "/",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])("a", {
                  onClick: function onClick() {
                    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_6__["logoutAction"])());
                  },
                  children: "\uB85C\uADF8\uC544\uC6C3"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 45,
                  columnNumber: 21
                }, _this)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 44,
                columnNumber: 19
              }, _this)
            }, "0", false, {
              fileName: _jsxFileName,
              lineNumber: 43,
              columnNumber: 17
            }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(antd__WEBPACK_IMPORTED_MODULE_3__["Menu"].Item, {
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
                href: "/profile",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])("a", {
                  children: "\uD504\uB85C\uD544"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 56,
                  columnNumber: 21
                }, _this)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 55,
                columnNumber: 19
              }, _this)
            }, "1", false, {
              fileName: _jsxFileName,
              lineNumber: 54,
              columnNumber: 17
            }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(antd__WEBPACK_IMPORTED_MODULE_3__["Menu"].Item, {
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
                href: "/community",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])("a", {
                  children: "\uCEE4\uBBA4\uB2C8\uD2F0"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 61,
                  columnNumber: 21
                }, _this)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 60,
                columnNumber: 19
              }, _this)
            }, "2", false, {
              fileName: _jsxFileName,
              lineNumber: 59,
              columnNumber: 17
            }, _this)]
          }, void 0, true) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["Fragment"], {
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(antd__WEBPACK_IMPORTED_MODULE_3__["Menu"].Item, {
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
                href: "/login",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])("a", {
                  children: "\uB85C\uADF8\uC778"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 69,
                  columnNumber: 21
                }, _this)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 68,
                columnNumber: 19
              }, _this)
            }, "0", false, {
              fileName: _jsxFileName,
              lineNumber: 67,
              columnNumber: 17
            }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(antd__WEBPACK_IMPORTED_MODULE_3__["Menu"].Item, {
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
                href: "/signup",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])("a", {
                  children: "\uD68C\uC6D0\uAC00\uC785"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 74,
                  columnNumber: 21
                }, _this)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 73,
                columnNumber: 19
              }, _this)
            }, "1", false, {
              fileName: _jsxFileName,
              lineNumber: 72,
              columnNumber: 17
            }, _this)]
          }, void 0, true), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(antd__WEBPACK_IMPORTED_MODULE_3__["Menu"].Item, {
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(SearchInput, {
              enterButton: true
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 80,
              columnNumber: 15
            }, _this)
          }, "5", false, {
            fileName: _jsxFileName,
            lineNumber: 79,
            columnNumber: 13
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 11
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 9
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(Content, {
        style: {
          padding: '0 50px'
        },
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(SiteLayoutContent, {
          children: children
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 85,
          columnNumber: 11
        }, _this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 9
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(Footer, {
        style: {
          textAlign: 'center'
        },
        children: "Ant Design \xA92018 Created by Ant UED"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 87,
        columnNumber: 9
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }, _this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 34,
    columnNumber: 5
  }, _this);
};

_s(AppLayout, "XmtqMR/uc0b6gdzy1STwGveQnZE=", false, function () {
  return [react_redux__WEBPACK_IMPORTED_MODULE_5__["useSelector"], react_redux__WEBPACK_IMPORTED_MODULE_5__["useDispatch"]];
});

_c4 = AppLayout;
AppLayout.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (AppLayout);

var _c, _c2, _c3, _c4;

$RefreshReg$(_c, "SearchInput");
$RefreshReg$(_c2, "SiteLayoutContent");
$RefreshReg$(_c3, "MovingLogo");
$RefreshReg$(_c4, "AppLayout");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9BcHBMYXlvdXQuanMiXSwibmFtZXMiOlsiSGVhZGVyIiwiTGF5b3V0IiwiQ29udGVudCIsIkZvb3RlciIsIlNlYXJjaElucHV0Iiwic3R5bGVkIiwiSW5wdXQiLCJTZWFyY2giLCJTaXRlTGF5b3V0Q29udGVudCIsImRpdiIsIk1vdmluZ0xvZ28iLCJpbWciLCJBcHBMYXlvdXQiLCJjaGlsZHJlbiIsImlzTG9nZ2VkSW4iLCJ1c2VTZWxlY3RvciIsInN0YXRlIiwidXNlciIsImRpc3BhdGNoIiwidXNlRGlzcGF0Y2giLCJsb2dvdXRBY3Rpb24iLCJwYWRkaW5nIiwidGV4dEFsaWduIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwibm9kZSIsImlzUmVxdWlyZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxJQUFRQSxNQUFSLEdBQW9DQywyQ0FBcEMsQ0FBUUQsTUFBUjtBQUFBLElBQWdCRSxPQUFoQixHQUFvQ0QsMkNBQXBDLENBQWdCQyxPQUFoQjtBQUFBLElBQXlCQyxNQUF6QixHQUFvQ0YsMkNBQXBDLENBQXlCRSxNQUF6QjtBQUVBLElBQU1DLFdBQVcsR0FBR0MsaUVBQU0sQ0FBQ0MsMENBQUssQ0FBQ0MsTUFBUCxDQUFUO0FBQUE7QUFBQTtBQUFBLDhCQUFqQjtLQUFNSCxXO0FBSU4sSUFBTUksaUJBQWlCLEdBQUdILHlEQUFNLENBQUNJLEdBQVY7QUFBQTtBQUFBO0FBQUEsc0RBQXZCO01BQU1ELGlCO0FBTU4sSUFBTUUsVUFBVSxHQUFHTCx5REFBTSxDQUFDTSxHQUFWO0FBQUE7QUFBQTtBQUFBLGtGQUFoQjtNQUFNRCxVOztBQVFOLElBQU1FLFNBQVMsR0FBRyxTQUFaQSxTQUFZLE9BQWtCO0FBQUE7O0FBQUEsTUFBZkMsUUFBZSxRQUFmQSxRQUFlO0FBQ2xDLE1BQU1DLFVBQVUsR0FBR0Ms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O0FBQVEsYUFBSyxFQUFFO0FBQUVTLG1CQUFTLEVBQUU7QUFBYixTQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBcERGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FERjtBQTRERCxDQWhFRDs7R0FBTVYsUztVQUNlRyx1RCxFQUNGSSx1RDs7O01BRmJQLFM7QUFrRU5BLFNBQVMsQ0FBQ1csU0FBVixHQUFzQjtBQUNwQlYsVUFBUSxFQUFFVyxpREFBUyxDQUFDQyxJQUFWLENBQWVDO0FBREwsQ0FBdEI7QUFJZWQsd0VBQWYiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvcHJvZmlsZS4wNzM4YTU5ZmRiYjgxMzI2ZjVhZi5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xuaW1wb3J0IHsgTGF5b3V0LCBNZW51LCBJbnB1dCB9IGZyb20gJ2FudGQnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyB1c2VTZWxlY3RvciwgdXNlRGlzcGF0Y2ggfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBsb2dvdXRBY3Rpb24gfSBmcm9tICcuLi9yZWR1Y2Vycyc7XG5cbmNvbnN0IHsgSGVhZGVyLCBDb250ZW50LCBGb290ZXIgfSA9IExheW91dDtcblxuY29uc3QgU2VhcmNoSW5wdXQgPSBzdHlsZWQoSW5wdXQuU2VhcmNoKWBcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbmA7XG5cbmNvbnN0IFNpdGVMYXlvdXRDb250ZW50ID0gc3R5bGVkLmRpdmBcbiAgbWluLWhlaWdodDogMjgwcHg7XG4gIHBhZGRpbmc6IDI0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG5gO1xuXG5jb25zdCBNb3ZpbmdMb2dvID0gc3R5bGVkLmltZ2BcbiAgZmxvYXQ6IGxlZnQ7XG4gIHdpZHRoOiAxMjBweDtcbiAgaGVpZ2h0OiAzMXB4O1xuICBtYXJnaW46IDE2cHggMjRweCAxNnB4IDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbmA7XG5cbmNvbnN0IEFwcExheW91dCA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgY29uc3QgaXNMb2dnZWRJbiA9IHVzZVNlbGVjdG9yKHN0YXRlID0+IHN0YXRlLnVzZXIuaXNMb2dnZWRJbik7XG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8TGF5b3V0IGNsYXNzTmFtZT1cImxheW91dFwiPlxuICAgICAgICA8SGVhZGVyPlxuICAgICAgICAgIDxMaW5rIGhyZWY9XCIvXCI+XG4gICAgICAgICAgICA8TW92aW5nTG9nbyBzcmM9XCIvaW1nL21vdmluZy5wbmdcIiAvPlxuICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICA8TWVudSB0aGVtZT1cImRhcmtcIiBtb2RlPVwiaG9yaXpvbnRhbFwiIGRlZmF1bHRTZWxlY3RlZEtleXM9e1snMyddfT5cbiAgICAgICAgICAgIHtpc0xvZ2dlZEluID8gKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxNZW51Lkl0ZW0ga2V5PVwiMFwiPlxuICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9cIj5cbiAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChsb2dvdXRBY3Rpb24oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIOuhnOq3uOyVhOybg1xuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgICAgPC9NZW51Lkl0ZW0+XG4gICAgICAgICAgICAgICAgPE1lbnUuSXRlbSBrZXk9XCIxXCI+XG4gICAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL3Byb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGE+7ZSE66Gc7ZWEPC9hPlxuICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgIDwvTWVudS5JdGVtPlxuICAgICAgICAgICAgICAgIDxNZW51Lkl0ZW0ga2V5PVwiMlwiPlxuICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9jb21tdW5pdHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGE+7Luk666k64uI7YuwPC9hPlxuICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgIDwvTWVudS5JdGVtPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPE1lbnUuSXRlbSBrZXk9XCIwXCI+XG4gICAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL2xvZ2luXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhPuuhnOq3uOyduDwvYT5cbiAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICA8L01lbnUuSXRlbT5cbiAgICAgICAgICAgICAgICA8TWVudS5JdGVtIGtleT1cIjFcIj5cbiAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvc2lnbnVwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhPu2ajOybkOqwgOyehTwvYT5cbiAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICA8L01lbnUuSXRlbT5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPE1lbnUuSXRlbSBrZXk9XCI1XCI+XG4gICAgICAgICAgICAgIDxTZWFyY2hJbnB1dCBlbnRlckJ1dHRvbiAvPlxuICAgICAgICAgICAgPC9NZW51Lkl0ZW0+XG4gICAgICAgICAgPC9NZW51PlxuICAgICAgICA8L0hlYWRlcj5cbiAgICAgICAgPENvbnRlbnQgc3R5bGU9e3sgcGFkZGluZzogJzAgNTBweCcgfX0+XG4gICAgICAgICAgPFNpdGVMYXlvdXRDb250ZW50PntjaGlsZHJlbn08L1NpdGVMYXlvdXRDb250ZW50PlxuICAgICAgICA8L0NvbnRlbnQ+XG4gICAgICAgIDxGb290ZXIgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICBBbnQgRGVzaWduIMKpMjAxOCBDcmVhdGVkIGJ5IEFudCBVRURcbiAgICAgICAgPC9Gb290ZXI+XG4gICAgICA8L0xheW91dD5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbkFwcExheW91dC5wcm9wVHlwZXMgPSB7XG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwTGF5b3V0O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==