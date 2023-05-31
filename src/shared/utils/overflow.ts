export function lockBody() {
    const body = document.body;
    if (body) body.style.overflow = "hidden";
  }
  
  export function unlockBody() {
    const body = document.body;
    if (body) body.style.overflow = "auto";
  }
  