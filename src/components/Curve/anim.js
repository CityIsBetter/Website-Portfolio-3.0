export const text = {
    initial: {
        opacity: 1,
    },
    enter: {
        opacity: 0,
        top: -100,
        transition: { duration: 0.5, delay: 0.2, ease: "easeInOut" },
        transitionEnd: { top: "47.5%" }
    },
    exit: {
        opacity: 1,
        top: "40%",
        transition: { duration: 0.4, delay: 0.2, ease: "easeInOut" }
    }
};

export const curve = (initialPath, targetPath) => {
    return {
        initial: {
            d: initialPath
        },
        enter: {
            d: targetPath,
            transition: { duration: 0.5, delay: 0.2, ease: "easeInOut" }
        },
        exit: {
            d: initialPath,
            transition: { duration: 0.5, ease: "easeInOut" }
        }
    };
};

export const translate = {
    initial: {
        transform: "translateY(-300px)"
    },
    enter: {
        transform: "translateY(-100vh)",
        transition: { duration: 0.5, delay: 0.2, ease: "easeInOut" },
        transitionEnd: {
            transform: "translateY(100vh)"
        }
    },
    exit: {
        transform: "translateY(-300px)",
        transition: { duration: 0.5, ease: "easeInOut" }
    }
};
