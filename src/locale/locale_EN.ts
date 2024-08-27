export default {
  IntroductionImage: {
    title: 'Express Delivery from Kazakhstan to Russia',
    description: 'A full range of transport and logistics services, including transportation, ' +
      'storage, and terminal handling of cargo from the sender’s door to the recipient’s door',
    buttonText: 'Order Cargo Transport',
  },

  DirectionsAndTraffics: {
    title: 'Directions and Tariffs',
    description: 'Priority shipping routes of “AvtoRail Jet”',
    cards: [
      {
        title: 'Service Area Coverage - Kazakhstan and Russia',
        subtitle: 'We provide fast delivery of consolidated cargo to/from',
        enumeration: ['Kazakhstan (Almaty)', 'All territory of Russia'],
      },
      {
        title: 'Always Updated on the “Cargo Transport Market”',
        subtitle: 'We provide exclusive offers to our clients for “fast” delivery mode',
      },
      {
        title: 'Personalized Logistics for Business',
        subtitle: 'Exclusive Offer\nFast delivery for the following directions:',
        enumeration: ['Almaty - Novosibirsk in 2 days', 'Almaty - Moscow in 5 days', 'Almaty - Kazan in 4 days', 'Almaty - Yekaterinburg in 4 days']
      }
    ],
    buttonText: 'Submit Request',
  },

  PartnershipBalk: {
    officialPartner: "Official Partner",
    buttonText: 'Go to Website'
  },

  FAQBlock: {
    title: 'Frequently Asked Questions',
    items: [
      {
        title: 'Where to hand over cargo for transport?',
        content: 'The partner cities are listed <a class="decorated-link" href="/#agencies">here</a>',
      },
      {
        title: 'How and where to pay for the transport?',
        content: 'Payment for transportation is made before or after the service is rendered, as agreed upon by the parties and reflected in the document signed by the parties',
      },
      {
        title: 'Is the cargo insured?',
        content: '“AvtoRail Jet” assumes full material responsibility for entrusted property and ' +
          'commitments within the framework of the current legislation of the Republic of Kazakhstan and the Russian Federation'
      },
      {
        title: 'What documents are required for transportation?',
        content: 'For individuals - cargo list; CMR; SNT; HS code (if these documents are not available, “AvtoRail Jet” assists in preparing the document package).\n' +
          '</br>For legal entities - CMR; Invoice; ESF; copy of the supply contract; export permit (if there are restrictions)'
      },
    ]
  },

  TransportCalculationBlock: {
    title: 'Transport Cost Calculation',
    subtitle: 'Submit a request for a cost estimate and our manager will contact you',
    buttonText: 'Order Cargo Transport',
    specifyButton: 'Specify Request Details',
    policyAccepting: ['By clicking the button, you agree to', 'the Privacy Policy'],
    inputs: [
      {
        placeholder: 'Your Name',
        errorText: 'Name is entered incorrectly',
      },
      {
        placeholder: '+7 (xxx) xxx xx xx',
        title: 'Phone',
        errorText: 'Phone number is entered incorrectly',
      },
      {
        placeholder: 'Email',
        errorText: 'Email address is entered incorrectly'
      }
    ]
  },

  AgenciesCities:{
    title: 'Partner Representation Cities'
  },

  PrettyFooter: {
    caption: 'Throughout Russia and Kazakhstan',
    buttonText: 'Order Cargo Transport',
    phoneText: '+7 7777 155 100',
    mailText: 'sale@avtorailjet.kz',
    addressText: 'Argymak St., 1 (formerly Promyshlennaya, 1)',
    policyText: 'Policy',
    offerText: 'Offer',
    copyright: '©LLP “AvtoRail Jet”, 2024'
  },

  FlexibleHeader: {
    routes: ['Home', 'Directions and Tariffs', 'Frequently Asked Questions', 'Partner Terminal Addresses'],
    addressText: 'Argymak St., 1 (formerly Promyshlennaya, 1)',
    phoneText: '+7 7777 155 100',
    mailText: 'sale@avtorailjet.kz',
    buttonText: 'Order Cargo Transport'
  },

  ModalFieldsWindow: {
    fileErrorNotification: 'File upload error: supported formats are .docx, .doc. File size: up to 15Mb',
    fileSuccessNotification: 'File uploaded',
    fileErrorLabel: "Error while uploading ${filename}",
    fileSuccessLabel: "${filename} is successfully uploaded",
    sendFileError: 'Error sending file! File ignored',
    orderError: 'Error submitting request!',

    orderSuccessTitle: 'Request Successfully Submitted',
    orderSuccessText: 'Our managers will contact you shortly',
    successButtonText: 'Return to Home',

    fileWindowTitle: 'Transport Cost Calculation',
    fileWindowSubtitle: 'Fill out and attach the cargo list to submit the request',
    fileDownloadText: 'Sample List',
    fileUploadText: 'Upload File',
    fileUploadHint: '(up to 15Mb)',
    fileUploadAnother: 'Upload Another File',
    fileButtonText: 'Submit Request',

    fieldsWindowTitle: 'Transport Cost Calculation',
    fieldsSubtitle: 'Fill out the request details',
    fieldsButtonText: 'Next',
    fieldsInputs: [
      {
        errorText: 'City name must be entered in Cyrillic',
        placeholder: 'City of Departure',
      },
      {
        errorText: 'City name must be entered in Cyrillic',
        placeholder: 'City of Arrival',
      },
      {
        errorText: 'Non-zero whole or decimal number',
        placeholder: 'Weight, kg',
      },
      {
        errorText: 'Non-zero whole or decimal number',
        placeholder: 'Volume, m3',
      },
      {
        errorText: 'Number less than 1 million',
        placeholder: 'Number of Packages, pcs',
      },
      {
        errorText: 'HS code must contain ten digits',
        placeholder: 'HS Code',
      },
      {
        errorText: 'Name is entered incorrectly',
        placeholder: 'Your Name*',
      },
      {
        errorText: 'Phone number is entered incorrectly',
        placeholder: 'Phone*',
      },
      {
        errorText: 'Email address is entered incorrectly',
        placeholder: 'Email*',
      },
    ]
  },

  NotFoundPage: {
    title: '404. Page Not Found :(',
    action: 'Return to Home'
  },

  LangSelector: {
    title: 'Choose the language'
  }
}
