const fetchBtn = document.getElementById('fetch-btn');
const videoUrl = document.getElementById('input-text');

fetchBtn.addEventListener('click', () => {
  if (videoUrl.value.trim() === '') {
    alert('digite uma url valida');
    return;
  }

  const linkYoutube = document.getElementById("link-yotube")
  linkYoutube.setAttribute("href", `${videoUrl.value}`)
  console.log(linkYoutube)

  const videoId = videoUrl.value.split('=', 2)[1];
  const url = `https://abhi-api.vercel.app/api/search/yts?text=${videoId[1]}`;


  // 1. Desabilita o botão para evitar cliques duplicados
  fetchBtn.disabled = true;
  fetchBtn.style.backgroundColor = 'grey';

  // 2. Muda o texto do botão
  fetchBtn.textContent = 'Carregando...';

  fetch(url)
    .then((response) => {
      response.json().then((data) => {
        // Restaurar o botão AQUI antes de processar!
        fetchBtn.disabled = false;
        fetchBtn.style.backgroundColor = 'transparent';
        fetchBtn.textContent = 'Buscar Dados';

        document.getElementById('input-text').value =''

        if (data.status === 'false' || data.code !== 200) {
          alert(`URL invalida ${data.result}`);
          return;
        }
        mostrarInfosVideo(data);
      });
    })
    .catch((error) => {
       // FIM DO FEEDBACK (Erro de Rede)
      fetchBtn.disabled = false;
      fetchBtn.style.backgroundColor = 'transparent';
      fetchBtn.textContent = 'Buscar Dados';

      console.error('Erro na rqsuisição (rede):', error);
      alert('Erro de conexão! Verifique sua internet ou o endereço da API');
    });
});

function mostrarInfosVideo(dados) {
  const { result } = dados;

  const videoThumbnail = document.getElementById('video-thumbnail');
  const videoTitle = document.getElementById('video-title');
  const videoUploaded = document.getElementById('video-uploud');
  const videoDuration = document.getElementById('video-duration');

  videoThumbnail.setAttribute('src', `${result.thumbnail}`);
  videoTitle.textContent = `${result.title}`;

  videoUploaded.textContent = `${result.uploaded}`;
  videoDuration.textContent = `${result.duration}`;
}

