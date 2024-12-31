'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface University {
  id: string;
  universities_name: string;
  universities_short_name: string;
  universities_location: string;
  universities_website: string;
  description: string;
  year_created: number;
  student_numbers: number;
}

const UniversityUpdatePanel = ({ params }: { params: { university_short_name: string } }) => {
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!params.university_short_name) return;

    fetchUniversity(params.university_short_name); // Fetch based on university short name
  }, [params.university_short_name]);

  const fetchUniversity = async (shortName: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/university/${shortName}`); // Fetch based on short name
      const data = await response.json();

      if (data) {
        setUniversity(data);
      } else {
        setError("University not found");
      }
    } catch (error) {
      setError("Failed to fetch university data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (university) {
      setUniversity({
        ...university,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!university) return;

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`/api/university/${university.universities_short_name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: university.description,
          year_created: university.year_created,
          student_numbers: university.student_numbers,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("University data updated successfully!");
      } else {
        setError("Failed to update university data.");
      }
    } catch (error) {
      setError("Error updating data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Update University Information</h1>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      {university ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">University Name</label>
            <input
              type="text"
              name="universities_name"
              value={university.universities_name}
              disabled
              className="input"
            />
          </div>

          <div>
            <label className="block">Short Name</label>
            <input
              type="text"
              name="universities_short_name"
              value={university.universities_short_name}
              disabled
              className="input"
            />
          </div>

          <div>
            <label className="block">Location</label>
            <input
              type="text"
              name="universities_location"
              value={university.universities_location}
              disabled
              className="input"
            />
          </div>

          <div>
            <label className="block">Website</label>
            <input
              type="text"
              name="universities_website"
              value={university.universities_website}
              disabled
              className="input"
            />
          </div>

          <div>
            <label className="block">Description</label>
            <textarea
              name="description"
              value={university.description}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="block">Year Created</label>
            <input
              type="number"
              name="year_created"
              value={university.year_created}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="block">Student Numbers</label>
            <input
              type="number"
              name="student_numbers"
              value={university.student_numbers}
              onChange={handleChange}
              className="input"
            />
          </div>

          <Button type="submit" className="w-full sm:w-auto">Save Changes</Button>
        </form>
      ) : (
        <p>No university data found.</p>
      )}
    </div>
  );
};

export default UniversityUpdatePanel;
