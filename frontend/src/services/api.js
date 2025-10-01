
export async function checkResume(file, jobDesc) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("job_description", jobDesc);

  try {
    const res = await fetch("http://127.0.0.1:8000/ats/check_resume", {
      method: "POST",
      body: formData
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
