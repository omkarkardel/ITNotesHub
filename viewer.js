(() => {
  const params = new URLSearchParams(window.location.search);
  const url = params.get('url') || '';
  const title = params.get('title') || 'Note';
  const autoDownload = params.get('download') === '1';

  const viewerTitle = document.getElementById('viewerTitle');
  const viewerDownload = document.getElementById('viewerDownload');
  const viewerOpen = document.getElementById('viewerOpen');
  const viewerFrame = document.getElementById('viewerFrame');
  const viewerImage = document.getElementById('viewerImage');
  const viewerMessage = document.getElementById('viewerMessage');

  if (viewerTitle) viewerTitle.textContent = title;

  if (!url) {
    if (viewerMessage) {
      viewerMessage.textContent = 'No file URL provided.';
      viewerMessage.classList.remove('hidden');
    }
    if (viewerDownload) viewerDownload.classList.add('hidden');
    if (viewerOpen) viewerOpen.classList.add('hidden');
    return;
  }

  const downloadUrl = `/download?${new URLSearchParams({ url }).toString()}`;
  if (viewerDownload) viewerDownload.href = downloadUrl;
  if (viewerOpen) viewerOpen.href = url;

  const lowerUrl = url.toLowerCase();
  const isPdf = lowerUrl.endsWith('.pdf');
  const isImage = /\.(png|jpg|jpeg|gif|webp)$/i.test(lowerUrl);

  if (isPdf) {
    viewerFrame.src = url;
    viewerFrame.classList.remove('hidden');
  } else if (isImage) {
    viewerImage.src = url;
    viewerImage.classList.remove('hidden');
  } else {
    if (viewerMessage) {
      viewerMessage.textContent = 'Preview not available for this file type. Use the download button.';
      viewerMessage.classList.remove('hidden');
    }
  }

  if (autoDownload && viewerDownload) {
    setTimeout(() => {
      viewerDownload.click();
    }, 150);
  }
})();
