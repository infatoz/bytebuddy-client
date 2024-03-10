import * as React from "react";
import { useState, useRef } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  Typography,
} from "@mui/material";

const ProblemsForm = () => {
  const [formData, setFormData] = useState({
    question_title: "",
    description: "",
    likes: 0,
    topics: [],
    categories: [],
    example_case: [{ sample_input: "", sample_output: "", explanation: "" }],
    sample_code: [{ language: "", code: "" }],
    test_case: [{ input: "", output: "" }],
  });
  const errorsRef = useRef({}); // To store validation errors

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTopicChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({ ...prevData, topics: value }));
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({ ...prevData, categories: value }));
  };

  const handleExampleCaseChange = (index, event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      const updatedExampleCase = [...prevData.example_case];
      updatedExampleCase[index][name] = value;
      return { ...prevData, example_case: updatedExampleCase };
    });
  };

  const handleSampleCodeChange = (index, event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      const updatedSampleCode = [...prevData.sample_code];
      updatedSampleCode[index][name] = value;
      return { ...prevData, sample_code: updatedSampleCode };
    });
  };

  const handleTestCaseChange = (index, event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      const updatedTestCase = [...prevData.test_case];
      updatedTestCase[index][name] = value;
      return { ...prevData, test_case: updatedTestCase };
    });
  };

  const addExampleCase = () => {
    setFormData((prevData) => ({
      ...prevData,
      example_case: [
        ...prevData.example_case,
        { sample_input: "", sample_output: "", explanation: "" },
      ],
    }));
  };

  const addSampleCode = () => {
    setFormData((prevData) => ({
      ...prevData,
      sample_code: [...prevData.sample_code, { language: "", code: "" }],
    }));
  };

  const addTestCase = () => {
    setFormData((prevData) => ({
      ...prevData,
      test_case: [...prevData.test_case, { input: "", output: "" }],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    errorsRef.current = {}; // Clear previous errors

    const { question_title, description } = formData;
    let isValid = true;

    if (!question_title) {
      errorsRef.current.question_title = "Question title is required";
      isValid = false;
    }

    if (!description) {
      errorsRef.current.description = "Description is required";
      isValid = false;
    }

    // Add additional validation checks if needed for other fields

    if (isValid) {
      // Submit form data (handle form submission here)
      console.log("Form submitted:", formData);
    } else {
      console.error("Form validation errors:", errorsRef.current);
    }
  };

  return (
    <>
      <div className="container-custom">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Problem Details</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Question Title"
                name="question_title"
                value={formData.question_title}
                onChange={handleChange}
                error={!!errorsRef.current.question_title}
                helperText={errorsRef.current.question_title}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={!!errorsRef.current.description}
                helperText={errorsRef.current.description}
                required
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="topics-label">Topics</InputLabel>
                <Select
                  labelId="topics-label"
                  name="topics"
                  multiple
                  value={formData.topics}
                  onChange={handleTopicChange}
                >
                  {/* Add MenuItem components for each topic option */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="categories-label">Categories</InputLabel>
                <Select
                  labelId="categories-label"
                  name="categories"
                  multiple
                  value={formData.categories}
                  onChange={handleCategoryChange}
                >
                  {/* Add MenuItem components for each category option */}
                </Select>
              </FormControl>
            </Grid>

            {/* ... (similar Grid layout for Example Cases, Sample Code, Test Cases) */}

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default ProblemsForm;
