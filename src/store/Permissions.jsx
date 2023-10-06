export async function checkCameraPermission() {
  try {
    const permissionStatus = await navigator.permissions.query({ name: 'camera' });
    if (permissionStatus.state === 'granted') {
      // L'autorisation de la caméra a déjà été accordée.
      return true;
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'autorisation de la caméra :', error);
  }
  return false;
}

// Utilisation de la fonction pour vérifier l'autorisation.
checkCameraPermission().then((cameraPermissionGranted) => {
  if (cameraPermissionGranted) {
    // L'autorisation est accordée, vous pouvez naviguer vers la page de capture ici.
  } else {
    // L'autorisation n'est pas accordée, vous pouvez demander à l'utilisateur de l'autoriser.
  }
});
