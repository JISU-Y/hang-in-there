export default function copyToClipboard(
  text: string,
  settlementCallbacks?: {
    resolve?: () => void;
    reject?: () => void;
  },
) {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(settlementCallbacks?.resolve)
      .catch(settlementCallbacks?.reject);
  } else {
    if (!document.queryCommandSupported("copy")) return;

    const textarea = document.createElement("textarea");
    textarea.value = text;

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    document.execCommand("copy");

    document.body.removeChild(textarea);
  }
}
