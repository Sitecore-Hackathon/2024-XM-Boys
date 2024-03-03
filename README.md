![Hackathon Logo](docs/images/hackathon.png?raw=true "Hackathon Logo")

# Sitecore Hackathon 2024

-   MUST READ: **[Submission requirements](SUBMISSION_REQUIREMENTS.md)**
-   [Entry form template](ENTRYFORM.md)

### ⟹ [Insert your documentation here](ENTRYFORM.md) <<

# Hackathon Submission Entry form

## Team name

XM Boys

## Category

2. Best Module for XM Cloud (AI Cloud Service)

## Description

XM Boys aims to leverage generative AI to provide a cloud service akin to Pages, Explorer, and Components, as part of Composable DXP. This AI platform, named Jarvis, will retrieve information from a selected template, allowing users to edit content similarly to Explorer. Moreover, a helper button, the AI Assistant, will open a prompt where users can provide context for the text field they wish to generate for their module. Users can also offer module or company context to ensure accurate results from the AI tool.

Finally, clicking the "Generate Content" button will create an item in Sitecore at the desired location. This initiative seeks to streamline content authoring and marketing efforts, providing an AI assistant for generative content, thereby saving time for users.

## Video link

[Demo Video Link in Youtube](https://www.youtube.com/watch?v=xpPPlX0gjas)

## Pre-requisites and Dependencies

### XM Cloud Solution

-   Install Docker Desktop and follow the pre-requisites for XM Cloud: [Walkthrough: Setting up your full-stack XM Cloud local development environment](https://doc.sitecore.com/xmc/en/developers/xm-cloud/walkthrough--setting-up-your-full-stack-xm-cloud-local-development-environment.html)

### Jarvis API (`/src/jarvis-api`)

-   Install Node JS `20.10.0`

### Jarvis UI (`/src/jarvis`)

-   Install Node JS `20.10.0`

## Installation Instructions

In order to use our module, it is necessary to install 3 different solutions:

-   XM Cloud starter kit
-   Our Jarvis API
-   Our Jarvis UI

### Install XM Cloud Solution

This repository is based on the XM Cloud starter kit.

1. In an ADMIN terminal:

```ps1
.\init.ps1 -InitEnv -LicenseXmlPath "C:\path\to\license.xml" -AdminPassword "DesiredAdminPassword"
```

2. Restart your terminal and run:

```ps1
.\up.ps1
```

3. Push Items

```ps1
dotnet sitecore ser push
```

### Install Jarvis API

The API is created in the `/src/jarvis-api` folder. Since it is an ExpressJS app, first you need to install the dependencies:

```bash
npm install
```

Also, this app uses a `.env.local` file to get some environment variables, so duplicate the `.env` file and rename it to `.env.local`. To set those variables, see the [configuration section](#configuration).

Build the solution:

```bash
npm run build
```

After that, you need to run the solution by executing this command:

```bash
npm run serve
```

This will initialize the API app at `http://localhost:3001`

### Install Jarvis UI

The UI is a separate NextJS app. To do this, go to the `/src/jarvis` directory and install the dependencies:

```bash
npm install
```

For this project, the `.env` file only contains the URL for the API app. As it is `http://localhost:3001`, duplicate the .env file and rename it to `.env.local`.

Finally, Build & run the solution:

```bash
npm run build
```

```bash
npm run start
```

This will initialize the UI at `http://localhost:3000`

### Configuration

#### Configure Jarvis API Environmental Variables

| Variable                      | Description                                                                                                                                                                                    |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PORT                          | Port where the services will be running (default: 3001)                                                                                                                                        |
| GRAPH_QL_ENDPOINT             | Endpoint for the GraphQL API (e.g., "https://xmcloudcm.localhost/sitecore/api/authoring/graphql/v1")                                                                                           |
| GRAPH_QL_API_KEY              | [API key](https://doc.sitecore.com/xmc/en/developers/xm-cloud/walkthrough--enabling-and-authorizing-requests-to-the-authoring-and-management-api.html) for accessing the Authoring GraphQL API |
| AZURE_OPEN_AI_ENDPOINT        | Endpoint for the Azure OpenAI service (e.g., "https://{your-instance}.openai.azure.com")                                                                                                       |
| AZURE_OPEN_AI_DEPLOYMENT_NAME | Name of the Azure OpenAI deployment                                                                                                                                                            |
| AZURE_OPEN_AI_API_KEY         | API key for accessing the Azure OpenAI service                                                                                                                                                 |
| AZURE_OPEN_AI_API_VERSION     | API version for the Azure OpenAI service (e.g., "2024-02-15-preview")                                                                                                                          |

#### Configure Jarvis API - Azure Open AI Service

-   Create an Azure OpenAI Service
-   Open Azure AI Studio
-   Create a Deployment
    -   Choose `gpt-35-turbo`
    -   Model version `0301`

For more information, refer to [How To Set Up and Configure a GPT Deployment Using the Azure OpenAI Service](https://techcommunity.microsoft.com/t5/startups-at-microsoft/how-to-set-up-and-configure-a-gpt-deployment-using-the-azure/ba-p/3849854)

## Usage Instructions

### Developer Configuration

1. Create your SXA Component by following the steps for Cloning Rendering:

    - [More Info](https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/developer-experience/creating-new-components)
    - Go to Template Definition
    - Inherit the `_Searchable on Jarvis` template from `Feature/Jarvis` feature.

### Marketer Use Case

1. Go to the Jarvis UI at [http://localhost:3000](http://localhost:3000)

2. Fill in the "Please Provide a Context" field with Company Information or Component-Relevant information that needs to be used to generate the content.

    - Example: "My company sells shoes. We are running a campaign to sell new shoes for 2024, targeting teenagers."

    ![Fill Context](docs/screenshots/step-1.png?raw=true "Fill Context")

3. Name: This input will be used to give a name to the Sitecore item.

4. Select a Template: Choose the template to work with.

![Step 4](docs/screenshots/step-4.png?raw=true "Step 4")

5. Choose Parent Location where this component will be saved.

![Step 5](docs/screenshots/step-5.png?raw=true "Step 5")

6. Based on your selection, the form will be dynamically rendered according to the component's fields.

![Step 6](docs/screenshots/step-5.png?raw=true "Step 6")

7.  Fill out all the fields and use the AI Assistant for Generative AI.

    -   Provide contextual information about the field in the prompt.

    ![Step 7](docs/screenshots/step-7.png?raw=true "Step 7")

    ![Step 8](docs/screenshots/step-8.png?raw=true "Step 8")

8.  Create Component Datasource.

    ![Step 9](docs/screenshots/step-9.png?raw=true "Step 9")

9.  Connect a component in Sitecore and connect the datasource.

    ![Step 10](docs/screenshots/step-10.png?raw=true "Step 10")
    ![Step 11](docs/screenshots/step-11.png?raw=true "Step 11")

10. Enjoy the rest of your day!

![Step 12](docs/screenshots/step-12.png?raw=true "Step 12")

## Comments

It is important to configure Azure Open AI properly, as well as ensuring proper network connectivity between Jarvis API, Jarvis UI, and the XM Cloud Instance (Docker containers).
