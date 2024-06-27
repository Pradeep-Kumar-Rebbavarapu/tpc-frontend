const redirect = () => { };
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const url = (NextUrl: string) => {
  return `${baseUrl}/api/v1${NextUrl}`;
};

export const GetJobById = async (jobId: string, accessToken: string | undefined) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  try {
    const res = await fetch(url(`/student-view/job/${jobId}`), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
      if (!res.ok) {
      throw new Error("Failed to fetch Job data");
      }
      const data = await res.json();
      return data;
  } catch (error) {
      console.error("Error fetching Job data:", error);
  }
};
export const GetJobs = async (accessToken: string | undefined) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  try {
    const res = await fetch(url(`/student-view/jobs`), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
      if (!res.ok) {
      throw new Error("Failed to fetch Job data");
      }
      const data = await res.json();
      return data;
  } catch (error) {
      console.error("Error fetching Job data:", error);
  }
};
export const GetSalaryById = async (salaryId: string, accessToken: string | undefined) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }

  try {
    const res = await fetch(url(`/student-view/salaries/${salaryId}`), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
      if (!res.ok) {
      throw new Error("Failed to fetch salary data");
      }
      const data = await res.json();
      return data;
  } catch (error) {
      console.error("Error fetching salary data:", error);
  }
};

export const GetOnCampusOffers = async (accessToken: string | undefined) => {
    if (!accessToken || accessToken === undefined) {
      redirect();
      return;
    }
    const res = await fetch(url("/student-view/offers/on-campus"), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await res.json();
    return json;
};

export const GetOffCampusOffers = async (accessToken: string | undefined) => {
    if (!accessToken || accessToken === undefined) {
      redirect();
      return;
    }
    const res = await fetch(url("/student-view/offers/off-campus"), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await res.json();
    return json;
};

export const GetResumes = async (accessToken: string | undefined) => {
    if (!accessToken || accessToken === undefined) {
      redirect();
      return;
    }
    const res = await fetch(url("/student-view/resume"), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await res.json();
    return json;
};


export const GetStudentData = async (accessToken: string | undefined) => {
    if (!accessToken || accessToken === undefined) {
      redirect();
      return;
    }
    const res = await fetch(url("/student-view"), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await res.json();
    return json;
};

export const ApplyJob = async (accessToken: string | undefined, salaryId: string, resumeId: string) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  
  const res = await fetch(url("/student-view/salaries"), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{ salaryId, resumeId }]),
  });

  const status = res.status;
  const json = await res.json();
  
  return { status, payload: json };
};

export const uploadResume = async (formData: FormData, accessToken: string) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }

  const response = await fetch(url('/student-view'), {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const status = response.status;
  
  return status;
};

export const deleteResume = async (filename: string, accessToken: string) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }

  const response = await fetch(url(`/student-view?filename=${filename}`), {
    method: 'DELETE',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.status;
};
