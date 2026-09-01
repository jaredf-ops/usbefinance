// Shared behavior for USBE Finance static reports.

// Wires up click/keyboard expand-toggle behavior for ledger-style detail rows.
// Expects: <tr class="row" data-target="detail-id" aria-expanded="false"> followed by
// <tr class="detail" id="detail-id"> ... </tr>
function initExpandableRows(root) {
  (root || document).querySelectorAll("tr.row").forEach(function (row) {
    function toggle() {
      const open = row.getAttribute("aria-expanded") === "true";
      row.setAttribute("aria-expanded", open ? "false" : "true");
      const target = document.getElementById(row.dataset.target);
      if (target) target.classList.toggle("open", !open);
    }
    row.addEventListener("click", toggle);
    row.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });
}

// Currency formatting helpers shared by report data-binding scripts.
const usbeFmt = {
  money: (n) => "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  money0: (n) => "$" + Number(n).toLocaleString("en-US", { maximumFractionDigits: 0 }),
};
