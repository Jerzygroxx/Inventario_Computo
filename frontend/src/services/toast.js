let addToastFn = null;

export function toast(msg, type = 'success') {
  if (addToastFn) addToastFn(msg, type);
}

toast.success = (msg) => toast(msg, 'success');
toast.error = (msg) => toast(msg, 'error');
toast.info = (msg) => toast(msg, 'info');

export function setToastHandler(fn) {
  addToastFn = fn;
}
