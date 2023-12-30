const locales = {
  english: {
    welcome_page: {
      title: {
        keyword: 'GraphiQL',
        text: 'is a playground/IDE for graphQL requests',
      },
      description:
        'GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.',
      features: {
        title: 'Features',
        list: ['Playground', 'Authentication', 'Localization'],
      },
      tech_stack: {
        title: 'Technology stack',
        list: [
          'HTML',
          'SCSS',
          'TypeScript',
          'React',
          'NextJS',
          'GraphQL',
          'Firebase',
        ],
      },
      team_members: {
        title: 'Team members',
        card: {
          name: 'Andrei Paleshka',
          role: 'Team Lead',
          contribution: {
            title: 'Contribution',
            list: [
              'Project setup',
              'GraphQL API requests',
              'Welcome Page',
              'Main Page',
              'Sign In/Sign Up pages',
              'Authentication',
              'Localization',
              'App Styling',
            ],
          },
        },
      },
    },
    main_page: {
      endpoint_changer: {
        placeholder: 'Type endpoint',
      },
      editor: {
        placeholder: 'Type query',
      },
      variables: 'Variables',
      headers: 'Headers',
      doc: {
        title: 'Documentation',
      },
    },
    sign_in_page: {
      title: 'Sign In',
      email: 'Email',
      password: 'Password',
      button: 'Sign In',
      auth_link: {
        text: "Don't have an account?",
        label: 'Sign Up',
      },
    },
    sign_up_page: {
      title: 'Sign Up',
      email: 'Email',
      password: 'Password',
      button: 'Sign Up',
      auth_link: {
        text: 'Already have an account?',
        label: 'Sign In',
      },
    },
    header: {
      links: {
        welcome: 'Welcome',
        main: 'Main',
      },
      auth_buttons: {
        sign_in: 'Sign In',
        sign_up: 'Sign Up',
        sing_out: 'Sing Out',
      },
    },
    footer: {
      team_members: {
        member: 'Andrei',
      },
    },
    validation: {
      email: {
        required: 'Email is required',
        message: 'Please enter a valid email address',
      },
      password: {
        required: 'Password is required',
        messages: {
          eight_symbols: 'Password must contain minimum 8 symbols',
          one_letter: 'Password must contain at least one letter',
          one_digit: 'Password must contain one digit',
          one_special: 'Password must contain one special character',
        },
      },
    },
  },
  belarusian: {
    welcome_page: {
      title: {
        keyword: 'GraphiQL',
        text: 'гэта рэдактар/IDE для запытаў GraphQL',
      },
      description:
        'GraphQL - гэта мова запытаў да API і аперацыйнае асяроддзе для выканання гэтых запытаў з існуючымі дадзенымі. GraphQL забяспечвае поўнае і зразумелае апісанне дадзеных у вашым API, дае кліентам магчымасць прасіць толькі тое, што ім трэба і нічога больш, што палягчае развіццё API з цягам часу і дае магчымасці выкарыстання эфектыўных інструментаў для распрацоўкі.',
      features: {
        title: 'Магчымасці',
        list: ['Рэдактар', 'Аўтэнтыфікацыя', 'Лакалізацыя'],
      },
      tech_stack: {
        title: 'Тэхналагічны стэк',
        list: [
          'HTML',
          'SCSS',
          'TypeScript',
          'React',
          'NextJS',
          'GraphQL',
          'Firebase',
        ],
      },
      team_members: {
        title: 'Члены каманды',
        card: {
          name: 'Андрэй Палешка',
          role: 'Лідар каманды',
          contribution: {
            title: 'Вклад',
            list: [
              'Налада праекта',
              'Запыты да GraphQL API',
              'Старонка прывітання',
              'Асноўная старонка',
              'Старонкі ўваходу/рэгістрацыі',
              'Аўтэнтыфікацыя',
              'Лакалізацыя',
              'Стылізацыя дадатка',
            ],
          },
        },
      },
    },
    main_page: {
      endpoint_changer: {
        placeholder: 'Увядзіце канчатковую кропку',
      },
      editor: {
        placeholder: 'Увядзіце запыт',
      },
      variables: 'Пераменныя',
      headers: 'Загалоўкі',
      doc: {
        title: 'Дакументацыя',
      },
    },
    sign_in_page: {
      title: 'Увайсці',
      email: 'Электронная пошта',
      password: 'Пароль',
      button: 'Увайсці',
      auth_link: {
        text: 'У вас няма акаўнта?',
        label: 'Зарэгістравацца',
      },
    },
    sign_up_page: {
      title: 'Зарэгістравацца',
      email: 'Электронная пошта',
      password: 'Пароль',
      button: 'Зарэгістравацца',
      auth_link: {
        text: 'У вас ужо ёсць акаўнт?',
        label: 'Увайсці',
      },
    },
    header: {
      links: {
        welcome: 'Прывітанне',
        main: 'Галоўная',
      },
      auth_buttons: {
        sign_in: 'Увайсці',
        sign_up: 'Зарэгістравацца',
        sing_out: 'Выйсці',
      },
    },
    footer: {
      team_members: {
        member: 'Андрэй',
      },
    },
    validation: {
      email: {
        required: 'Патрабуецца электронная пошта',
        message: 'Калі ласка, увядзіце сапраўдную электронную пошту',
      },
      password: {
        required: 'Патрабуецца пароль',
        messages: {
          eight_symbols: 'Пароль павінен змяшчаць мінімум 8 сімвалаў',
          one_letter: 'Пароль павінен змяшчаць хаця б адну літару',
          one_digit: 'Пароль павінен змяшчаць адну лічбу',
          one_special: 'Пароль павінен змяшчаць адзін спецыяльны сімвал',
        },
      },
    },
  },
};

export { locales };
