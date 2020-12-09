window.onload = function () {
  const liffId = ''
  initializeLiff(liffId);
}

function initializeLiff(myLiffId) {
  liff
    .init({
      liffId: myLiffId
    })
    .then(() => {
      // start to use LIFF's api
      getProfile();
    })
    .catch((err) => {

    });
}

function getProfile() {
  liff.getProfile()
    .then(profile => {
      const name = profile.displayName
      document.getElementById('nama').textContent = name
    })
    .catch((err) => {
      console.log('error', err);
    })
}

