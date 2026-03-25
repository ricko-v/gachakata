import { defineComponent, ref, withAsyncContext, computed, mergeProps, unref, customRef, watch, isRef, withCtx, createVNode, withModifiers, openBlock, createBlock, createCommentVNode, toDisplayString, createTextVNode, useSSRContext, createElementBlock, shallowRef, getCurrentInstance, provide, cloneVNode, h, toValue, onServerPrefetch, nextTick, toRef } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderSlot } from 'vue/server-renderer';
import { a as useNuxtApp, _ as _export_sfc, d as asyncDataDefaults, f as createError } from './server.mjs';
import { v as klona, x as getRequestHeader, y as isEqual, z as setCookie, A as getCookie, B as deleteCookie } from '../nitro/nitro.mjs';
import { debounce } from 'perfect-debounce';
import * as htmlToImage from 'html-to-image';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    title: {}
  },
  emits: ["update:modelValue", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const dialogRef = ref(null);
    watch(
      () => props.modelValue,
      (val) => {
        if (val) {
          dialogRef.value?.showModal();
        } else {
          dialogRef.value?.close();
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<dialog${ssrRenderAttrs(mergeProps({
        ref_key: "dialogRef",
        ref: dialogRef,
        class: "modal-dialog backdrop:bg-black/50 rounded-lg shadow-xl w-full max-w-md p-0 bg-white"
      }, _attrs))} data-v-2de0ef94><div class="p-5" data-v-2de0ef94><div class="flex items-center justify-between mb-4" data-v-2de0ef94><h3 class="text-lg font-semibold text-cyan-900" data-v-2de0ef94>${ssrInterpolate(__props.title)}</h3><button class="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close" data-v-2de0ef94><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" data-v-2de0ef94><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" data-v-2de0ef94></path></svg></button></div><div class="text-sm text-gray-700 space-y-2" data-v-2de0ef94>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></dialog>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["__scopeId", "data-v-2de0ef94"]]), { __name: "Modal" });
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
function parseCookieValue(value) {
  if (value === "undefined") {
    return void 0;
  }
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed === "number" && String(parsed) !== value) {
      return value;
    }
    return parsed;
  } catch {
    return value;
  }
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => parseCookieValue(decodeURIComponent(val)),
  encode: (val) => {
    if (typeof val !== "string" || val === "undefined") {
      return encodeURIComponent(JSON.stringify(val));
    }
    try {
      if (typeof JSON.parse(val) !== "string") {
        return encodeURIComponent(JSON.stringify(val));
      }
    } catch {
    }
    return encodeURIComponent(val);
  },
  refresh: false
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.());
  const cookie = cookieServerRef(name, cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      const valueIsSame = isEqual(cookie.value, cookies[name]);
      if (opts.readonly || valueIsSame && !opts.refresh) {
        return;
      }
      nuxtApp._cookiesChanged ||= {};
      if (valueIsSame && opts.refresh && !nuxtApp._cookiesChanged[name]) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
function cookieServerRef(name, value) {
  const internalRef = ref(value);
  const nuxtApp = useNuxtApp();
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return internalRef.value;
      },
      set(newValue) {
        nuxtApp._cookiesChanged ||= {};
        nuxtApp._cookiesChanged[name] = true;
        internalRef.value = newValue;
        trigger();
      }
    };
  });
}
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
function defineKeyedFunctionFactory(factory) {
  const placeholder = function() {
    throw new Error(`[nuxt] \`${factory.name}\` is a compiler macro and cannot be called at runtime.`);
  };
  return Object.defineProperty(placeholder, "__nuxt_factory", {
    enumerable: false,
    get: () => factory.factory
  });
}
const createUseAsyncData = defineKeyedFunctionFactory({
  name: "createUseAsyncData",
  factory(options = {}) {
    function useAsyncData2(...args) {
      const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
      if (_isAutoKeyNeeded(args[0], args[1])) {
        args.unshift(autoKey);
      }
      let [_key, _handler, opts = {}] = args;
      const key = computed(() => toValue(_key));
      if (typeof key.value !== "string") {
        throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
      }
      if (typeof _handler !== "function") {
        throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
      }
      const shouldFactoryOptionsOverride = typeof options === "function";
      const nuxtApp = useNuxtApp();
      const factoryOptions = shouldFactoryOptionsOverride ? options(opts) : options;
      if (!shouldFactoryOptionsOverride) {
        for (const key2 in factoryOptions) {
          if (factoryOptions[key2] === void 0) {
            continue;
          }
          if (opts[key2] !== void 0) {
            continue;
          }
          opts[key2] = factoryOptions[key2];
        }
      }
      opts.server ??= true;
      opts.default ??= getDefault;
      opts.getCachedData ??= getDefaultCachedData;
      opts.lazy ??= false;
      opts.immediate ??= true;
      opts.deep ??= asyncDataDefaults.deep;
      opts.dedupe ??= "cancel";
      if (shouldFactoryOptionsOverride) {
        for (const key2 in factoryOptions) {
          if (factoryOptions[key2] === void 0) {
            continue;
          }
          opts[key2] = factoryOptions[key2];
        }
      }
      nuxtApp._asyncData[key.value];
      function createInitialFetch() {
        const initialFetchOptions = { cause: "initial", dedupe: opts.dedupe };
        if (!nuxtApp._asyncData[key.value]?._init) {
          initialFetchOptions.cachedData = opts.getCachedData(key.value, nuxtApp, { cause: "initial" });
          nuxtApp._asyncData[key.value] = buildAsyncData(nuxtApp, key.value, _handler, opts, initialFetchOptions.cachedData);
        }
        return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
      }
      const initialFetch = createInitialFetch();
      const asyncData = nuxtApp._asyncData[key.value];
      asyncData._deps++;
      const fetchOnServer = opts.server !== false && nuxtApp.payload.serverRendered;
      if (fetchOnServer && opts.immediate) {
        const promise = initialFetch();
        if (getCurrentInstance()) {
          onServerPrefetch(() => promise);
        } else {
          nuxtApp.hook("app:created", async () => {
            await promise;
          });
        }
      }
      const asyncReturn = {
        data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
        pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
        status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
        error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
        refresh: (...args2) => {
          if (!nuxtApp._asyncData[key.value]?._init) {
            const initialFetch2 = createInitialFetch();
            return initialFetch2();
          }
          return nuxtApp._asyncData[key.value].execute(...args2);
        },
        execute: (...args2) => asyncReturn.refresh(...args2),
        clear: () => {
          const entry = nuxtApp._asyncData[key.value];
          if (entry?._abortController) {
            try {
              entry._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
            } finally {
              entry._abortController = void 0;
            }
          }
          clearNuxtDataByKey(nuxtApp, key.value);
        }
      };
      const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
      Object.assign(asyncDataPromise, asyncReturn);
      Object.defineProperties(asyncDataPromise, {
        then: { enumerable: true, value: asyncDataPromise.then.bind(asyncDataPromise) },
        catch: { enumerable: true, value: asyncDataPromise.catch.bind(asyncDataPromise) },
        finally: { enumerable: true, value: asyncDataPromise.finally.bind(asyncDataPromise) }
      });
      return asyncDataPromise;
    }
    return useAsyncData2;
  }
});
const useAsyncData = createUseAsyncData.__nuxt_factory();
createUseAsyncData.__nuxt_factory({
  lazy: true,
  // @ts-expect-error private property
  _functionName: "useLazyAsyncData"
});
function writableComputedRef(getter) {
  return computed({
    get() {
      return getter()?.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
async function refreshNuxtData(keys) {
  {
    return Promise.resolve();
  }
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = void 0;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = unref(nuxtApp._asyncData[key]._default());
    nuxtApp._asyncData[key].error.value = void 0;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function buildAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  nuxtApp.payload._errors[key] ??= void 0;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = _handler ;
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData !== void 0;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: computed(() => asyncData.status.value === "pending"),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (...args) => {
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if ((opts.dedupe ?? options.dedupe) === "defer") {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
        if (cachedData !== void 0) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = void 0;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      if (asyncData._abortController) {
        asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
      }
      asyncData._abortController = new AbortController();
      asyncData.status.value = "pending";
      const cleanupController = new AbortController();
      const promise = new Promise(
        (resolve, reject) => {
          try {
            const timeout = opts.timeout ?? options.timeout;
            const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], cleanupController.signal, timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
            }, { once: true, signal: cleanupController.signal });
            return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = void 0;
        asyncData.status.value = "success";
      }).catch((error) => {
        if (nuxtApp._asyncDataPromises[key] && nuxtApp._asyncDataPromises[key] !== promise) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (asyncData._abortController?.signal.aborted) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
          asyncData.status.value = "idle";
          return nuxtApp._asyncDataPromises[key];
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        cleanupController.abort();
        delete nuxtApp._asyncDataPromises[key];
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      unsubRefreshAsyncData();
      if (nuxtApp._asyncData[key]?._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          if (!nuxtApp._asyncData[key]?._init) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => void 0;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = AbortSignal.timeout?.(timeout);
    if (timeoutSignal) {
      list.push(timeoutSignal);
    }
  }
  if (AbortSignal.any) {
    return AbortSignal.any(list);
  }
  const controller = new AbortController();
  for (const sig of list) {
    if (sig.aborted) {
      const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    const abortedSignal = list.find((s) => s.aborted);
    const reason = abortedSignal?.reason ?? new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    sig.addEventListener?.("abort", onAbort, { once: true, signal: cleanupSignal });
  }
  return controller.signal;
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Settings",
  __ssrInlineRender: true,
  props: {
    showModal: { type: Boolean },
    data: {}
  },
  emits: ["close", "update:showModal"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const localShowModal = computed({
      get: () => props.showModal,
      set: (val) => emit("update:showModal", val)
    });
    const kataKunci = ref(props.data?.kataKunci ?? "");
    const isValidQ = ref(!!props.data);
    const loading = ref(false);
    const loadingReset = ref(false);
    const cookie = useCookie("gachakata");
    function onInput(e) {
      const val = e.target.value.toLowerCase();
      kataKunci.value = val;
    }
    watch(kataKunci, (val) => {
      if (val !== "" && val.length < 3) {
        isValidQ.value = false;
      } else {
        isValidQ.value = true;
      }
    });
    function reset() {
      loadingReset.value = true;
      cookie.value = null;
      (void 0).location.reload();
    }
    async function save() {
      loading.value = true;
      cookie.value = { kataKunci: kataKunci.value };
      await refreshNuxtData();
      loading.value = false;
      emit("close");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_Modal, mergeProps({
        modelValue: unref(localShowModal),
        "onUpdate:modelValue": ($event) => isRef(localShowModal) ? localShowModal.value = $event : null,
        title: "Setelan",
        onClose: ($event) => emit("close")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form${_scopeId}><label class="text-cyan-900 font-semibold"${_scopeId}>Kata Kunci</label><input minlength="3" required${ssrRenderAttr("value", unref(kataKunci))} class="border w-full rounded mt-1 px-3 py-2 outline-0 focus:border-cyan-900"${_scopeId}>`);
            if (!unref(isValidQ) && unref(kataKunci) !== "") {
              _push2(`<small class="text-red-500"${_scopeId}> Minimal 3 huruf diperlukan </small>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(kataKunci) === "" || unref(isValidQ)) {
              _push2(`<small class="text-slate-500"${_scopeId}> Masukan nama tokoh atau kata </small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex w-full justify-end mt-4 gap-3"${_scopeId}>`);
            if (__props.data) {
              _push2(`<button type="reset" class="bg-red-600 font-semibold text-white px-3 py-2 rounded-lg"${_scopeId}>${ssrInterpolate(unref(loadingReset) ? "Mengatur Ulang..." : "Atur Ulang")}</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(loading) || !unref(isValidQ)) ? " disabled" : ""} class="bg-cyan-900 font-semibold text-white px-3 py-2 rounded-lg disabled:bg-slate-300"${_scopeId}>${ssrInterpolate(unref(loading) ? "Menyimpan..." : "Simpan")}</button></div></form>`);
          } else {
            return [
              createVNode("form", {
                onReset: withModifiers(reset, ["prevent"]),
                onSubmit: withModifiers(save, ["prevent"])
              }, [
                createVNode("label", { class: "text-cyan-900 font-semibold" }, "Kata Kunci"),
                createVNode("input", {
                  minlength: "3",
                  required: "",
                  value: unref(kataKunci),
                  onInput,
                  class: "border w-full rounded mt-1 px-3 py-2 outline-0 focus:border-cyan-900"
                }, null, 40, ["value"]),
                !unref(isValidQ) && unref(kataKunci) !== "" ? (openBlock(), createBlock("small", {
                  key: 0,
                  class: "text-red-500"
                }, " Minimal 3 huruf diperlukan ")) : createCommentVNode("", true),
                unref(kataKunci) === "" || unref(isValidQ) ? (openBlock(), createBlock("small", {
                  key: 1,
                  class: "text-slate-500"
                }, " Masukan nama tokoh atau kata ")) : createCommentVNode("", true),
                createVNode("div", { class: "flex w-full justify-end mt-4 gap-3" }, [
                  __props.data ? (openBlock(), createBlock("button", {
                    key: 0,
                    type: "reset",
                    class: "bg-red-600 font-semibold text-white px-3 py-2 rounded-lg"
                  }, toDisplayString(unref(loadingReset) ? "Mengatur Ulang..." : "Atur Ulang"), 1)) : createCommentVNode("", true),
                  createVNode("button", {
                    type: "submit",
                    disabled: unref(loading) || !unref(isValidQ),
                    class: "bg-cyan-900 font-semibold text-white px-3 py-2 rounded-lg disabled:bg-slate-300"
                  }, toDisplayString(unref(loading) ? "Menyimpan..." : "Simpan"), 9, ["disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Settings.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$3, { __name: "Settings" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Info",
  __ssrInlineRender: true,
  props: {
    showModal: { type: Boolean }
  },
  emits: ["close", "update:showModal"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const localShowModal = computed({
      get: () => props.showModal,
      set: (val) => emit("update:showModal", val)
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_Modal, mergeProps({
        modelValue: unref(localShowModal),
        "onUpdate:modelValue": ($event) => isRef(localShowModal) ? localShowModal.value = $event : null,
        title: "Informasi Projek",
        onClose: ($event) => emit("close")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}>Halo teman-teman semua 👋</p><p${_scopeId}> Kali ini saya membuat sebuah mini projek open source dengan nama &quot;GachaKata&quot;. Projek GachaKata ini dibuat dengan <a href="https://nuxt.com/" target="_blank" class="text-blue-600"${_scopeId}>Nuxtjs</a> dan <a href="https://tailwindcss.com/" target="_blank" class="text-blue-600"${_scopeId}>Tailwindcss</a>. </p><p${_scopeId}> Projek GachaKata sangatlah simple, hanya menggacha sebuah kata dari tokoh-tokoh dunia. Jika teman-teman ingin berkontribusi untuk menambah fitur, silahkan menuju ke repositori projek <a href="https://github.com/ricko-v/gachakata" target="_blank" class="text-blue-600"${_scopeId}>GachaKata</a> 👈 </p><p${_scopeId}> API? tentu saja sudah saya buatkan di <a class="text-blue-600" href="https://gachakata.vercel.app/api/gacha?q=manusia" target="_blank"${_scopeId}>api/gacha?q={kata_kunci}</a></p><p class="text-center mt-4 text-slate-600"${_scopeId}> @2023 by <a href="https://github.com/ricko-v" class="text-blue-600" target="_blank"${_scopeId}>ricko-v</a></p>`);
          } else {
            return [
              createVNode("p", null, "Halo teman-teman semua 👋"),
              createVNode("p", null, [
                createTextVNode(' Kali ini saya membuat sebuah mini projek open source dengan nama "GachaKata". Projek GachaKata ini dibuat dengan '),
                createVNode("a", {
                  href: "https://nuxt.com/",
                  target: "_blank",
                  class: "text-blue-600"
                }, "Nuxtjs"),
                createTextVNode(" dan "),
                createVNode("a", {
                  href: "https://tailwindcss.com/",
                  target: "_blank",
                  class: "text-blue-600"
                }, "Tailwindcss"),
                createTextVNode(". ")
              ]),
              createVNode("p", null, [
                createTextVNode(" Projek GachaKata sangatlah simple, hanya menggacha sebuah kata dari tokoh-tokoh dunia. Jika teman-teman ingin berkontribusi untuk menambah fitur, silahkan menuju ke repositori projek "),
                createVNode("a", {
                  href: "https://github.com/ricko-v/gachakata",
                  target: "_blank",
                  class: "text-blue-600"
                }, "GachaKata"),
                createTextVNode(" 👈 ")
              ]),
              createVNode("p", null, [
                createTextVNode(" API? tentu saja sudah saya buatkan di "),
                createVNode("a", {
                  class: "text-blue-600",
                  href: "https://gachakata.vercel.app/api/gacha?q=manusia",
                  target: "_blank"
                }, "api/gacha?q={kata_kunci}")
              ]),
              createVNode("p", { class: "text-center mt-4 text-slate-600" }, [
                createTextVNode(" @2023 by "),
                createVNode("a", {
                  href: "https://github.com/ricko-v",
                  class: "text-blue-600",
                  target: "_blank"
                }, "ricko-v")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Info.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$2, { __name: "Info" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FloatingButton",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean }
  },
  emits: ["onDownload", "onShowModal", "onShowModalInfo"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed flex gap-[20px] bottom-[5px] right-5 lg:block lg:bottom-5" }, _attrs))}>`);
      if (!__props.loading) {
        _push(`<div class="mb-4"><button class="bg-cyan-900 text-white p-3 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cloud-arrow-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z"></path><path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-4"><button class="bg-cyan-900 text-white p-3 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16"><path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"></path><path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"></path></svg></button></div><div><button class="bg-cyan-900 text-white p-3 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path></svg></button></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FloatingButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "FloatingButton" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const cookieData = useCookie("gachakata");
    const showModal = ref(false);
    const showModalInfo = ref(false);
    const loading = ref(false);
    const acak = ref("");
    const randomKeywords = [
      "Ali bin Abi Thalib",
      "Tere Liye",
      "Albert Einstein",
      "Mahatma Gandhi",
      "Wira Nagara",
      "Boy Candra",
      "Pidi Baiq",
      "Sujiwo Tejo",
      "Fiersa Besari",
      "Joko Pinurbo",
      "Sapardi Djoko Damono",
      "Soekarno",
      "Jatuh Cinta",
      "Patah Hati",
      "Rindu",
      "Hujan",
      "Sepi",
      "Manusia",
      "Doa",
      "Ibu"
    ];
    const { data: fetchedData, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("gacha", async () => {
      let q;
      let page = "";
      if (cookieData.value) {
        q = cookieData.value.kataKunci;
        if (cookieData.value.lastPage) {
          page = `&page=${Math.floor(Math.random() * cookieData.value.lastPage)}`;
        }
      } else {
        q = randomKeywords[Math.floor(Math.random() * randomKeywords.length)];
      }
      const data = await $fetch(
        `/api/gacha?q=${encodeURIComponent(q)}${page}`
      );
      if (cookieData.value) {
        cookieData.value = {
          ...cookieData.value,
          lastPage: data.lastPaginate
        };
      }
      return data;
    })), __temp = await __temp, __restore(), __temp);
    const kata = computed(() => {
      const result = fetchedData.value?.result;
      if (result && result.length > 0 && result[0]) {
        return result[0];
      }
      return null;
    });
    function randomEffectQ(x) {
      let a = "";
      for (let i = 0; i < x.length - 1; i++) {
        a += " " + x[Math.floor(Math.random() * x.length)];
      }
      return a;
    }
    function download() {
      const el = (void 0).getElementById("main-gacha");
      if (!el) return;
      htmlToImage.toJpeg(el, { quality: 1 }).then((dataUrl) => {
        const link = (void 0).createElement("a");
        link.download = `gachakata-${Math.floor(Math.random() * 99999)}.jpeg`;
        link.href = dataUrl;
        link.click();
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Settings = __nuxt_component_0;
      const _component_Info = __nuxt_component_1;
      const _component_FloatingButton = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-slate-50 py-10 min-h-screen w-full font-semibold text-cyan-900 flex items-center" }, _attrs))}><div class="w-full"><div class="flex justify-center"><h1 class="text-5xl tracking-widest">#GachaKata</h1></div><div class="flex justify-center mt-4 flex-wrap"><a href="https://github.com/ricko-v/gachakata/releases/download/release/GachaKata.apk"><img class="mr-2 my-1" alt="Download APK" src="https://img.shields.io/badge/download-aplikasi-blue?style=?style=for-the-badge&amp;logo=android"></a></div><div class="flex justify-center my-8 w-100 mx-4"><div id="main-gacha" class="border rounded-lg text-center border-stone-100 shadow-sm w-100 w-full p-3 bg-white md:w-2/3">`);
      if (unref(kata)) {
        _push(`<div><p class="text-left text-4xl">❝</p><i class="text-xl">${ssrInterpolate(unref(loading) ? randomEffectQ(unref(kata).q) : unref(kata).q)}</i><p class="text-right text-4xl leading-4 mt-[20px]">❞</p><p class="text-left leading-4"><span class="text-neutral-600">${ssrInterpolate(unref(loading) ? randomEffectQ(unref(kata).nama) : unref(kata).nama)}</span><br><small class="text-neutral-500">${ssrInterpolate(unref(loading) ? randomEffectQ(unref(kata).keterangan) : unref(kata).keterangan)}</small><br><small class="text-neutral-500">${ssrInterpolate(unref(loading) ? randomEffectQ(unref(kata).sumber) : unref(kata).sumber)}</small></p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(kata)) {
        _push(`<div><p class="text-left text-4xl">❝</p><i class="text-xl">Kata kunci &#39;${ssrInterpolate(unref(cookieData)?.kataKunci)}&#39; tidak ditemukan :(</i><p class="text-right text-4xl leading-4 mt-[20px]">❞</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_Settings, {
        data: unref(cookieData),
        onClose: ($event) => showModal.value = false,
        showModal: unref(showModal)
      }, null, _parent));
      _push(ssrRenderComponent(_component_Info, {
        onClose: ($event) => showModalInfo.value = false,
        showModal: unref(showModalInfo)
      }, null, _parent));
      _push(`<div class="flex justify-center mt-6 mb-6"><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="bg-cyan-900 p-3 rounded text-white rounded-lg"> - ${ssrInterpolate(unref(loading) ? unref(acak) : !unref(kata) ? "G A N T I" : "G A C H A")} - </button></div></div><div>`);
      _push(ssrRenderComponent(_component_FloatingButton, {
        loading: unref(loading),
        onOnDownload: download,
        onOnShowModal: ($event) => showModal.value = true,
        onOnShowModalInfo: ($event) => showModalInfo.value = true
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BwTJ4ot0.mjs.map
