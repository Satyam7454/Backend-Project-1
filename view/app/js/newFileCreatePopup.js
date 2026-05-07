    const addFileBtn = document.getElementById('addFileBtn');
    const addFilePanel = document.getElementById('addFilePanel');
    const addFileBackdrop = document.getElementById('addFileBackdrop');
    const closePanelBtn = document.getElementById('closePanelBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const addFileForm = document.getElementById('addFileForm');

    function showPanel() {
      addFilePanel.classList.remove('translate-x-full');
      addFileBackdrop.classList.remove('hidden');
    }

    function hidePanel() {
      addFilePanel.classList.add('translate-x-full');
      addFileBackdrop.classList.add('hidden');
    }

    addFileBtn.addEventListener('click', showPanel);
    closePanelBtn.addEventListener('click', hidePanel);
    cancelBtn.addEventListener('click', hidePanel);

    addFileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const fileName = document.getElementById('fileName').value;
      const fileType = document.getElementById('fileType').value;
      console.log('File Name:', fileName, 'File Type:', fileType);
      hidePanel();
      addFileForm.reset();
    });