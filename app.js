const btnOpen = document.getElementById('btn-open');
const sealTrigger = document.getElementById('seal-trigger');
const coverLayer = document.getElementById('cover-layer');
const video = document.getElementById('portal-video');
const interactiveLayer = document.getElementById('interactive-layer');
const bgMusic = document.getElementById('bg-music');

// Função única para romper o lacre e iniciar a transição
function openInvitation() {
  // Dá play na música se existir
  if (bgMusic) {
    bgMusic.play().catch(() => {});
  }

  // Inicia o vídeo
  video.play().then(() => {
    coverLayer.style.opacity = '0';
    setTimeout(() => {
      coverLayer.style.display = 'none';
    }, 800);
  }).catch(err => {
    console.error('Falha ao iniciar vídeo:', err);
  });
}

// O convidado pode tocar no próprio selo do envelope ou no botão abaixo
if (sealTrigger) {
  sealTrigger.addEventListener('click', openInvitation);
}
if (btnOpen) {
  btnOpen.addEventListener('click', openInvitation);
}

// Quando o vídeo termina (~5 a 10s)
video.addEventListener('ended', () => {
  video.style.opacity = '0';
  setTimeout(() => {
    video.style.display = 'none';
    interactiveLayer.classList.add('active');
  }, 400);
});

// Funções dos Modais
function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

function copyPix() {
  const pixInput = document.getElementById('pix-key');
  pixInput.select();
  pixInput.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(pixInput.value);
  alert('Chave PIX copiada com sucesso!');
}