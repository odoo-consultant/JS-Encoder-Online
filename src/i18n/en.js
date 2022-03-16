export default {
    common: {
        prevPage: "previous page",
        nextPage: "next page",
        unfollowButton: "unfollow",
        followButton: "follow",
        likeButton: "like",
        unlikeButton: "unlike",
        saveButton: "preservation",
        cancelButton: "cancel",
        confirmButton: "confirm",
        deleteButton: "delete",
        createNewButton: "New instance",
        searchButton: "search",
        filterButton: "filter",
        modifyButton: "modify",
        shareButton: "share",
        downloadButton: "download",
        refreshButton: "refresh",
        fullscreenButton: "Fullscreen",
        goHomeButton: "Return to home page",
        sortLabel: "sort",
        createDate: "Create date",
        updateDate: "Update date",
        popularity: "Popularity",
        account: "account",
        signin: "Sign In",
        signup: "Sign Up",
        username: "username",
        nickname: "nickname",
        email: "email",
        verifyCode: "Verification Code",
        password: "password",
        prompt: "Tips",
        work: "example",
        followee: "followee",
        follower: "follower",
        like: "like",
        unlike: "unlike",
        config: "config",
        mine: "mine",
        logout: "Logout",
        recycleBin: "recycle bin",
        loginRequiredTips: "Please log in and then carry out relevant operations",
        emptyGridTips: "It's empty",
        unknownErrorMessage: "unknown error",
        likeSelfProhibited: "You can't like your own examples"
    },
    clipboard: {
        linkCopiedTips: "Link copied to clipboard"
    },
    home: {
        slogan1: "OWL Online Editor for Odoo Developer",
        slogan2: "Make Odoo Better",
        createNow: "Create Now",
        viewDocument: "Odoo App @ play",
        whatisOOE: "Focus on",
        features: {
            cloudStorage: "Cloud Storage",
            importExport: "Import & Export",
            customizable: "Customizable",
            codeSyntax: "Multi Languages",
            markdown: "Markdown",
            console: "Console",
            cloudStorageDesc: "Save code to the cloud, share instance links, let more people know your work.",
            importExportDesc: "You can import local code for online editing, or export the code to the local.",
            customizableDesc: "Can be personalized according to your coding habits.",
            codeSyntaxDesc: "Supports HTML, CSS, and JavaScript languages for compilation and highlighting.",
            markdownDesc: "Real-time preview, synchronous scrolling, writing documents more smoothly.",
            consoleDesc: "Emulated Chrome native Console, supports various types of log highlighting."
        }
    },
    navList: {
        explore: "Explore",
        features: "Features",
        feedback: "Feedback",
        document: "Document",
        github: "GitHub"
    },
    headerAccount: {
        logoutTips: "After logging out, you can only log in manually next time"
    },
    header: {
        newWorkName: "New instance",
        save: "preservation",
        like: "give the thumbs-up",
        unlike: "Cancel like",
        savedTips: "Instance saved successfully",
        saveErrorMessage: "Instance saving failed"
    },
    footer: {
        menuProduct: {
            title: "Product",
            features: "Features",
            log: "Release",
            issues: "Issues"
        },
        aboutProduct: {
            title: "About",
            github: "GitHub",
            license: "License"
        },
        supportProduct: {
            title: "Support",
            email: "Email",
            sponsor: "Sponsor"
        }
    },
    explore: {
        searchTips: "Find what you want",
        searchButton: "search",
        filterButton: "filter",
        preprocessLabel: "Pretreatment",
        sortByCreateDate: "Creation time",
        sortByUpdateDate: "Update date",
        sortByPopularity: "Liking degree",
        noDataTips1: "Oh, I didn't find anything~~",
        noDataTips2: "But I think maybe you can open up a new world for this place."
    },
    features: {
        changeLogTitle: "Update matters"
    },
    feedback: {
        title: "Come and give your valuable advice",
        title2: "title",
        content: "Tell me what you think",
        submitButton: "Submit recommendations",
        titleRequiredTips: "Please fill in the title",
        titleMaxLengthTips: "The title length cannot exceed 25 characters",
        contentRequiredTips: "Please fill in the suggestions",
        fetchFeedbackSuccessTips: "Get feedback successfully",
        feedbackSuccessTips: "Feedback successful",
        feedbackErrorMessage: "Feedback failure"
    },
    instance: {
        loadingTips: "Instance page loading",
        requestingTips: "Requesting instance information",
        readonlyTips: "Your changes to the current instance will not be saved",
        exitButton: "sign out",
        editor: {
            formatCode: "formatting code",
            switchView: "Switch view"
        },
        console: {
            clear: "Automatically clear history log",
            clearTips: "Selecting this option will clear the previously generated history log before each code execution.  You can choose to keep the history log, but it may affect performance",
            highlight: "Code highlighting",
            highlightTips: "When this option is selected, the log content will be highlighted and rendered"
        },
        footer: {
            compilingTips: "Code compilation in progress, please wait"
        },
        sidebar: {
            templates: "Template",
            prep: "Preprocessing language",
            library: "library",
            settings: "set up",
            upload: "Upload code",
            download: "Download code",
            shortcut: "Shortcut key"
        },
        download: {
            title: "File download",
            singleFile: "Single file",
            singleFileTips: "Integrate HTML, CSS, and JavaScript code into one HTML file",
            multiFile: "Multiple files",
            multiFileTips: "Generate HTML, CSS and JS files and put them into the folder",
            downloadRawFile: "Download files before Compilation",
            downloadRawFileTips: "If you use a preprocessing language, checking this option will download files before compilation."
        },
        library: {
            title: "library",
            CDNErrorTips: "Failed to get CDN list",
            retry: "retry",
            outerCss: "External style",
            outerCssTips: "The external styles you add will be executed in sequence before the local CSS, and support HTTP and HTTPS protocol links.",
            searchingOuterCss: "Find external styles",
            noMatchedCDN: "No matching CDN",
            addOuterCss: "Add external style",
            outerJs: "External script",
            outerJsTips: "The external scripts you add will be executed in sequence before the local JavaScript execution, and support HTTP and HTTPS protocol links",
            searchingOuterJs: "Find external script",
            addOuterJs: "Add external script"
        },
        preprocess: {
            title: "Preprocessing language"
        },
        settings: {
            title: "set up",
            executeDelayTime: "Delayed execution time",
            executeDelayTimeTips: "When you finish the code, we will wait for some time to execute it.",
            autoExecute: "Automatic execution",
            autoExecuteTips: "If this option is selected, the code will be executed automatically.  If it is not selected, you need to click the execute button to execute the code",
            autoComplete: "Code prompt",
            autoCompleteTips: "Selecting this option will prompt you appropriately when you enter the code",
            lint: "Code specification check",
            lintTips: "Enabling this option will check the code specification.  At present, the check of preprocessing language is not supported",
            lineWrap: "If the code exceeds the width of the editing window, it will be displayed on a new line",
            codeIndent: "Code indent",
            replaceTabWithSpace: "Replace tab with space of equal width",
            codeIndentNumber: "Indent number",
            fontFamily: "typeface",
            fontSize: "Font size (PX)",
            metaTags: "Head label",
            metaTagsTips: "Enter the tag you want to add in < head >, such as < meta... >"
        },
        shortcut: {
            title: "Shortcut key",
            common: "currency"
        },
        template: {
            title: "Template",
            headerTips: "Select your template (this may overwrite the code and external links of your current instance)"
        },
        upload: {
            title: "Upload file",
            headerTips1: "Upload local files in the format of",
            headerTips2: "The contents of the file will overwrite the contents of the corresponding editing window.",
            breakdownHtml: "Decomposing HTML files",
            breakdownHtmlTips: "If this option is selected, the editor will separate the HTML, CSS, JavaScript code and external links in the HTML file, the code will overwrite the code of the corresponding editor, and the external links will be automatically added to the library.",
            pickFile: "Select file",
            pendingFileList: "List of files to be uploaded",
            uploadFile: "Upload file",
            uploadSuccessTips: "All files have been uploaded successfully",
            uploadErrorMessage: "Error during file upload"
        },
        config: {
            title: "Instance settings",
            workNameLabel: "Instance title",
            inputWorkNameTips: "Fill in instance title",
            workTag: "Instance label",
            workTagTips: "Add or modify instance labels.  There are at most three labels, and the length of each label is less than 15",
            inputWorkTagTips: "Add instance label",
            workVisibility: "Publicity",
            workVisibilityTips: "Set the instance to private, and others will not access your instance.  However, each user can only have up to 5 private instances",
            visibilityPublic: "public",
            visibilityPrivate: "private",
            titleRequiredTips: "Please fill in the example title",
            tagMaxLengthTips: "The length of each label cannot be greater than 15",
            configSuccessTips: "Instance settings modified successfully",
            configErrorMessage: "Instance setting modification failed",
            noMorePrivateWorks: "Private instance has reached the upper limit"
        }
    },
    user: {
        noProfileDescTips: "He hasn't figured out how to describe himself"
    },
    recycleBin: {
        headerTips: "Your instance can be restored to normal status within 7 days after it is put into the recycle bin.  If it is overdue, it will be deleted automatically.",
        deleteTime: "Delete date",
        restore: "recovery",
        purge: "Permanently delete",
        noDataTips: "The recycle bin is empty",
        confirmTips: "The instance cannot be restored after it is permanently deleted",
        confirmButton: "Confirm and continue",
        deleteWork: "Delete instance",
        deleteWorkTips: "The instance will be saved in the recycle bin for 7 days and will be permanently deleted after 7 days.  Are you sure to continue this operation",
        deleteConfirmButton: "Confirm and delete"
    },
    work: {
        noDataTips1: "You currently have no instances saved in the cloud",
        noDataTips2: "Quickly contribute high-quality examples to the community"
    },
    like: {
        noDataTips1: "perhaps",
        noDataTips2: "You haven't found what you like yet?"
    },
    follower: {
        noDataTips1: "You don't have fans yet",
        noDataTips2: "Create excellent works and enhance your influence in the community"
    },
    followee: {
        noDataTips1: "You haven't followed anyone yet",
        noDataTips2: "Why don't you explore?  Maybe you'll really be interested?",
        exploreNow: "To explore"
    },
    signin: {
        title: "Sign In",
        username: "Username or email",
        githubOAuth2: "Log in using GitHub",
        giteeOAuth2: "Login with gitee",
        forgotPassword: "Forgot the password?",
        loginButton: "Sign In",
        loginSuccessTips: "Login successful",
        usernameRequiredTips: "Please fill in the user name or email address",
        passwordRequiredTips: "Please fill in the password",
        bindErrorMessage: "Binding failed, the account has been bound",
        loginErrorMessage: "Login failed, user name / email or password error",
        bindSuccessTips: "Binding succeeded",
        verify: {
            title: "Third party login confirmation",
            headerTips: "Have you created your owl encoder account?",
            yesToSignin: "Yes, sign in",
            noToSignup: "No, sign up"
        }
    },
    signup: {
        title: "Create your own",
        usernameHint: "The user name can only contain letters and numbers, and the length is less than 15",
        nicknameHint: "Nickname length is less than 25",
        passwordHint: "The password must contain alphanumeric and underscore characters and be 6-12 in length",
        rePassword: "Duplicate password",
        sendVerifyCodeButton: "Send verification code",
        verifyCodeSentTips: "Verification code sent",
        sentPrefixTips: "has been sent",
        usernameRequiredTips: "Please fill in the user name",
        usernameMaxLengthTips: "User name length cannot be greater than 15",
        usernameFormatTips: "The user name can only contain letters and numbers",
        nicknameRequiredTips: "Please fill in your nickname",
        nicknameMaxLengthTips: "Nickname length cannot be greater than 25",
        emailRequiredTips: "Please fill in the email",
        emailFormatTips: "Fill in the correct email in order to send the verification code",
        verifyCodeRequiredTips: "Please fill in the verification code",
        passwordRequiredTips: "Please fill in the password",
        passwordMaxLengthTips: "The password length must be between 6-12",
        passwordFormatTips: "The password must contain letters, numbers, and underscores",
        rePasswordRequiredTips: "Please confirm the password",
        rePasswordFormatTips: "The two passwords are inconsistent",
        signupSuccessTips: "login was successful",
        verifyCodeErrorMessage: "Verification code error",
        usernameDuplicatedErrorMessage: "The username is already used",
        emailDuplicatedErrorMessage: "The email has been used"
    },
    settings: {
        title: "set up",
        menuProfile: "Personal settings",
        menuCode: "Coding settings",
        menuAccount: "Account settings",
        account: {
            title: "Third party account",
            headerTips: "Bind a third-party account and you can log in quickly through the third-party account.",
            unbindButton: "Unbind",
            bindButton: "Binding account",
            bindEmailButton: "Bind email",
            bindEmailTips: "Modify the bound email, which is used to retrieve the password and other operations.",
            currentEmailLabel: "Current email",
            deleteAccountButton: "Account deletion",
            deleteAccountTips: "Please note that this will delete your account and all the information in it.  This operation cannot be restored",
            unbindConfirmTips: "Are you sure to unbind the third party?",
            unbindSuccessTips: "Unbinding succeeded",
            unbindErrorMessage: "Unbinding failed"
        },
        code: {
            title: "Default preprocessor",
            defaultInitCode: "Default initial code",
            defaultHead: "Default head",
            inputHeadTips: "Enter the tag you want to add in < head >, such as < meta... >",
            codeIndent: "Code indent",
            codeIndentNumber: "Indent number",
            replaceTabWithSpace: "Replace tab with space of equal width",
            fontFamily: "typeface",
            fontSize: "Font size (PX)",
            preview: "preview",
            saveSuccessTips: "Code settings saved successfully"
        },
        profile: {
            title: "head portrait",
            headerTips: "Select a JPG or PNG image from your device as a new avatar.",
            uploadButton: "Upload Avatar",
            cropImageButton: "Crop picture",
            saveSuccessTips: "Personal settings saved successfully",
            about: "About you",
            aboutTips: "Let others know you better",
            emailTips: "Your contact email",
            nicknameRequiredTips: "Please fill in your nickname",
            nicknameMaxLengthTips: "Nickname length cannot be greater than 25",
            emailFormatTips: "Email format error",
            abountMaxLengthTips: "The length of the content cannot exceed 150",
            fileFormatTips: "File format error",
            imageMaxSizeTips: "The picture size cannot exceed 2m"
        },
        resetPassword: {
            title: "reset password",
            headerTips: "After the reset is successful, you will return to the login page",
            passwordRequiredTips: "Please fill in the password",
            passwordMaxLengthTips: "The password length must be between 6-12",
            passwordFormatTips: "The password must contain letters, numbers, and underscores",
            rePasswordRequiredTips: "Please confirm the password",
            rePasswordFormatTips: "The two passwords are inconsistent",
            resetSuccessTips: "Password reset succeeded",
            resetErrorMessage: "Failed to reset password",
            resetButton: "reset password"
        }
    },
    http404: {
        title: "The page is missing"
    }
}