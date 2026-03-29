

'use strict';


const DOM = {
  // Sidebar
  navItems:       document.querySelectorAll('.nav-item'),

  // Topbar
  notifBtn:       document.getElementById('notifBtn'),
  notifDropdown:  document.getElementById('notifDropdown'),
  withdrawBtn:    document.getElementById('withdrawBtn'),

  // Modals
  withdrawModal:  document.getElementById('withdrawModal'),
  detailModal:    document.getElementById('detailModal'),
  withdrawAmount: document.getElementById('withdrawAmount'),
  cancelWithdraw: document.getElementById('cancelWithdraw'),
  confirmWithdraw:document.getElementById('confirmWithdraw'),
  closeDetail:    document.getElementById('closeDetailModal'),
  viewContract:   document.getElementById('viewContractBtn'),
  detailTitle:    document.getElementById('detailTitle'),
  detailSub:      document.getElementById('detailSub'),
  detailBody:     document.getElementById('detailBody'),

  // Table rows
  escrowRows:     document.querySelectorAll('.escrow-row'),
  historyRows:    document.querySelectorAll('.history-row'),

  // Activity
  activityItems:  document.querySelectorAll('.activity-item'),
  viewLogBtn:     document.getElementById('viewLogBtn'),

  // Misc
  viewAllActive:  document.getElementById('viewAllActive'),
  filterBtn:      document.getElementById('filterBtn'),
  exportBtn:      document.getElementById('exportBtn'),

  // Toast
  toast:          document.getElementById('toast'),
  toastMsg:       document.getElementById('toastMsg'),

  // Count-up spans
  countSpans:     document.querySelectorAll('.counting'),
};


let _toastTimer = null;

function showToast(message) {
  clearTimeout(_toastTimer);
  DOM.toastMsg.textContent = message;
  DOM.toast.classList.add('show');
  _toastTimer = setTimeout(() => DOM.toast.classList.remove('show'), 3000);
}


function animateCount(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1200;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

function initCountAnimations() {
  DOM.countSpans.forEach(el => {
    setTimeout(() => animateCount(el), 300);
  });
}


function initNav() {
  DOM.navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const href = item.getAttribute('href');
      if (href && href !== 'index.html' && href.indexOf('#') !== 0) {
        showToast('Opening ' + (item.textContent || '').trim() + '…');
        return;
      }
      e.preventDefault();
      DOM.navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });
}


function initNotifications() {
  DOM.notifBtn.addEventListener('click', e => {
    e.stopPropagation();
    DOM.notifDropdown.classList.toggle('open');
  });

  document.addEventListener('click', e => {
    if (!DOM.notifDropdown.contains(e.target) && e.target !== DOM.notifBtn) {
      DOM.notifDropdown.classList.remove('open');
    }
  });
}


function openModal(overlay) {
  overlay.classList.add('open');
}

function closeModal(overlay) {
  overlay.classList.remove('open');
}

// Close modal on overlay click
[DOM.withdrawModal, DOM.detailModal].forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal(overlay);
  });
});


const AVAILABLE_BALANCE = 36800;

function initWithdraw() {
  DOM.withdrawBtn.addEventListener('click', () => openModal(DOM.withdrawModal));

  DOM.cancelWithdraw.addEventListener('click', () => closeModal(DOM.withdrawModal));

  DOM.confirmWithdraw.addEventListener('click', () => {
    const raw = parseFloat(DOM.withdrawAmount.value);

    if (!DOM.withdrawAmount.value || isNaN(raw) || raw <= 0) {
      showToast('⚠ Please enter a valid amount');
      DOM.withdrawAmount.focus();
      return;
    }

    if (raw > AVAILABLE_BALANCE) {
      showToast('⚠ Amount exceeds available balance of GH₵ ' + AVAILABLE_BALANCE.toLocaleString());
      return;
    }

    closeModal(DOM.withdrawModal);
    DOM.withdrawAmount.value = '';
    showToast('✓ Withdrawal of GH₵ ' + raw.toLocaleString() + ' initiated');
  });
}


function buildEscrowDetail(data) {
  const { name, contract, amount, total, done, all, status } = data;
  const pct = Math.round((parseInt(done) / parseInt(all)) * 100);
  const remaining = parseInt(all) - parseInt(done);
  const badgeClass = status === 'Escrow Funded' ? 'badge-funded' : 'badge-awaiting';

  DOM.detailTitle.textContent = name;
  DOM.detailSub.textContent   = contract;

  DOM.detailBody.innerHTML = `
    <div class="detail-grid">
      <div class="detail-box">
        <div class="detail-box-label">Amount Earned</div>
        <div class="detail-box-value">${amount}</div>
      </div>
      <div class="detail-box">
        <div class="detail-box-label">Contract Total</div>
        <div class="detail-box-value">${total}</div>
      </div>
    </div>

    <div class="detail-progress-label">Shift Progress</div>
    <div class="detail-progress-wrap">
      <div class="detail-progress-bar-bg">
        <div class="detail-progress-bar-fill" style="width:${pct}%"></div>
      </div>
      <span class="detail-progress-count">${done}/${all} shifts</span>
    </div>

    <div class="detail-status-row">
      <span class="detail-remaining">${remaining} shift${remaining !== 1 ? 's' : ''} remaining</span>
      <span class="badge ${badgeClass}">${status}</span>
    </div>
  `;
}

function initEscrowRows() {
  DOM.escrowRows.forEach(row => {
    row.addEventListener('click', () => {
      buildEscrowDetail({
        name:     row.dataset.name,
        contract: row.dataset.contract,
        amount:   row.dataset.amount,
        total:    row.dataset.total,
        done:     row.dataset.done,
        all:      row.dataset.all,
        status:   row.dataset.status,
      });
      DOM.viewContract.style.display = 'flex';
      openModal(DOM.detailModal);
    });
  });
}


function buildPaymentDetail(row) {
  const name   = row.querySelector('.detail-name').textContent;
  const sub    = row.querySelector('.detail-sub').textContent;
  const amount = row.querySelector('.amount-primary').textContent.trim();
  const status = row.querySelector('.badge').textContent.trim();
  const date   = row.querySelector('.date-cell').textContent.trim();

  const badgeClass = status === 'PAID' ? 'badge-paid' : 'badge-processing';

  DOM.detailTitle.textContent = name;
  DOM.detailSub.textContent   = sub;

  DOM.detailBody.innerHTML = `
    <div class="detail-grid">
      <div class="detail-box">
        <div class="detail-box-label">Amount</div>
        <div class="detail-box-value">${amount}</div>
      </div>
      <div class="detail-box">
        <div class="detail-box-label">Date</div>
        <div class="detail-box-value sm">${date}</div>
      </div>
    </div>
    <div class="detail-status-row">
      <span class="detail-status-label">Payment status</span>
      <span class="badge ${badgeClass}">${status}</span>
    </div>
  `;
}

function initHistoryRows() {
  DOM.historyRows.forEach(row => {
    row.addEventListener('click', () => {
      buildPaymentDetail(row);
      DOM.viewContract.style.display = 'none';
      openModal(DOM.detailModal);
    });
  });
}


function initDetailModal() {
  DOM.closeDetail.addEventListener('click', () => closeModal(DOM.detailModal));

  DOM.viewContract.addEventListener('click', () => {
    closeModal(DOM.detailModal);
    showToast('Opening contract details…');
  });
}


function initActivity() {
  DOM.activityItems.forEach(item => {
    item.addEventListener('click', () => {
      showToast(item.dataset.toast || 'Activity details');
    });
  });

  DOM.viewLogBtn.addEventListener('click', () => {
    showToast('Loading full activity log…');
  });
}


function initToolbar() {
  DOM.viewAllActive.addEventListener('click', () => {
    showToast('Showing all active contracts…');
  });

  DOM.filterBtn.addEventListener('click', () => {
    showToast('Filter options coming soon');
  });

  DOM.exportBtn.addEventListener('click', exportCSV);
}


function exportCSV() {
  const rows = [['Hospital / Clinic', 'Description', 'Amount', 'Status', 'Date']];

  DOM.historyRows.forEach(row => {
    rows.push([
      row.querySelector('.detail-name').textContent,
      row.querySelector('.detail-sub').textContent,
      row.querySelector('.amount-primary').textContent.trim(),
      row.querySelector('.badge').textContent.trim(),
      row.querySelector('.date-cell').textContent.trim(),
    ]);
  });

  const csv     = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  const blob    = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url     = URL.createObjectURL(blob);
  const anchor  = document.createElement('a');

  anchor.href     = url;
  anchor.download = 'payment_history.csv';
  anchor.click();

  URL.revokeObjectURL(url);
  showToast('✓ CSV exported successfully');
}


document.addEventListener('DOMContentLoaded', () => {
  initCountAnimations();
  initNav();
  initNotifications();
  initWithdraw();
  initEscrowRows();
  initHistoryRows();
  initDetailModal();
  initActivity();
  initToolbar();
});
