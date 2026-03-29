(() => {
  const asset = (name) => `../assets/${name}`;

  function money(n, currency = "GHS") {
    if (typeof n !== "number") return String(n ?? "—");
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(n);
  }

  function iconFor(type) {
    // You can swap these later if you export more icons.
    return asset("Activitydetailsicon.png");
  }

  function headlineFor(item) {
    switch (item.type) {
      case "verification_pending":
        return "Verification Pending";
      case "escrow_deposit":
        return "Payment into Escrow";
      case "practitioner_payout":
        return "Practitioner Payout";
      case "payment_released":
        return "Payment Released";
      case "contract_extended":
        return "Contract Extended";
      case "contract_terminated":
        return "Contract Terminated";
      default:
        return "System Activity";
    }
  }

  function amountFor(item) {
    if (typeof item.amount !== "number") return "";
    return money(item.amount, item.currency || "GHS");
  }

  function subFor(item) {
    switch (item.type) {
      case "verification_pending":
        return `${item.hospital} has a pending verification request.`;
      case "escrow_deposit":
        return `${item.hospital} deposited ${money(item.amount, item.currency)} into escrow (verification pending).`;
      case "practitioner_payout":
        return `${item.hospital} paid ${money(item.amount, item.currency)} to ${item.practitioner}.`;
      case "payment_released":
        return `Escrow released ${money(item.amount, item.currency)} to ${item.practitioner}.`;
      case "contract_extended":
        return `Contract between ${item.hospital} and ${item.practitioner} was extended.`;
      case "contract_terminated":
        return `Contract between ${item.hospital} and ${item.practitioner} was terminated.`;
      default:
        return item.summary || "Click to view details.";
    }
  }

  function openFor(item) {
    if (item.type === "verification_pending" && typeof window.openActivityDetailsModal === "function") {
      window.openActivityDetailsModal({
        actionType: "Verification Pending",
        userInvolved: item.hospital,
        dateTime: item.dateTime,
        status: "Pending Verification",
        description: item.description,
      });
      return;
    }

    if (item.type === "escrow_deposit" && typeof window.openEscrowPaymentModal === "function") {
      window.openEscrowPaymentModal(item);
      return;
    }

    if (item.type === "practitioner_payout" && typeof window.openPractitionerPayoutModal === "function") {
      window.openPractitionerPayoutModal(item);
      return;
    }

    if (item.type === "payment_released" && typeof window.openPaymentReleaseModal === "function") {
      window.openPaymentReleaseModal(item);
      return;
    }

    if ((item.type === "contract_extended" || item.type === "contract_terminated") && typeof window.openContractChangeModal === "function") {
      window.openContractChangeModal(item);
      return;
    }

    alert("No modal registered for this activity yet.");
  }

  function renderSystemActivityFeed(containerEl, items) {
    const root = typeof containerEl === "string" ? document.getElementById(containerEl) : containerEl;
    if (!root) return;

    if (!Array.isArray(items) || items.length === 0) {
      root.innerHTML = `<div class="saf-empty">No activity yet.</div>`;
      return;
    }

    root.innerHTML = items
      .map((item, idx) => {
        const amount = amountFor(item);
        const tone =
          item.type === "contract_terminated"
            ? "danger"
            : item.type === "escrow_deposit" || item.type === "verification_pending"
              ? "pending"
              : "success";
        return `
          <div class="saf-item" role="button" tabindex="0" data-saf-idx="${idx}" data-tone="${tone}">
            <div class="saf-top">
              <div class="saf-title">
                <span class="saf-ico" aria-hidden="true"><img src="${iconFor(item.type)}" alt="" /></span>
                <div class="saf-headline">${headlineFor(item)}</div>
              </div>
              <div class="saf-meta">
                ${amount ? `<span class="saf-amount">${amount}</span>` : ""}
                <span>${item.dateTime || ""}</span>
              </div>
            </div>
            <div class="saf-sub">${subFor(item)}</div>
          </div>
        `;
      })
      .join("");

    root.querySelectorAll("[data-saf-idx]").forEach((el) => {
      const idx = Number(el.getAttribute("data-saf-idx"));
      const item = items[idx];
      const act = () => openFor(item);
      el.addEventListener("click", act);
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          act();
        }
      });
    });
  }

  function seedActivities() {
    // Personas: Perfect Health and Wellness Centre + Dr Kofi Mensah (Cardiology)
    return [
      {
        type: "escrow_deposit",
        hospital: "Perfect Health and Wellness Centre",
        practitioner: "Dr. Kofi Mensah (Cardiology)",
        amount: 1200,
        currency: "GHS",
        dateTime: "Oct 24, 2023, 10:30 AM",
        escrowId: "ESC-10294",
        status: "Verification Pending",
      },
      {
        type: "verification_pending",
        hospital: "Perfect Health and Wellness Centre",
        dateTime: "Oct 24, 2023, 10:32 AM",
        description:
          "Hospital profile created and documents uploaded for verification.\nSystem awaiting manual review for approval.",
      },
      {
        type: "practitioner_payout",
        hospital: "Perfect Health and Wellness Centre",
        practitioner: "Dr. Kofi Mensah (Cardiology)",
        amount: 800,
        currency: "GHS",
        dateTime: "Oct 25, 2023, 09:15 AM",
        payoutRef: "PAY-44821",
        destination: "Practitioner Account",
      },
      {
        type: "payment_released",
        hospital: "Perfect Health and Wellness Centre",
        practitioner: "Dr. Kofi Mensah (Cardiology)",
        amount: 650,
        currency: "GHS",
        dateTime: "Oct 26, 2023, 04:05 PM",
        releaseRef: "REL-77014",
        from: "Escrow",
      },
      {
        type: "contract_extended",
        hospital: "Perfect Health and Wellness Centre",
        practitioner: "Dr. Kofi Mensah (Cardiology)",
        dateTime: "Nov 01, 2023, 11:20 AM",
        previousEnd: "Dec 31, 2023",
        newEnd: "Jun 30, 2024",
        initiatedBy: "Hospital",
      },
      {
        type: "contract_terminated",
        hospital: "Perfect Health and Wellness Centre",
        practitioner: "Dr. Kofi Mensah (Cardiology)",
        dateTime: "Nov 10, 2023, 02:40 PM",
        reason: "Service agreement ended by practitioner request.",
        initiatedBy: "Practitioner",
      },
    ];
  }

  function init() {
    const container = document.getElementById("systemActivityFeed");
    if (!container) return;
    renderSystemActivityFeed(container, seedActivities());
  }

  init();
})();

