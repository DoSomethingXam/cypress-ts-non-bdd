const setupHelper = {
	hideLogRequest(envVariable: string, name: string, classParent: string, classChild?: string): void {
		if (Cypress.env(envVariable)) {
			const app: Window | null = window.top;
			if (
				app &&
				!app.document.head.querySelector(`[data-hide-${name}-log-request]`)
			) {
				const style: HTMLStyleElement = app.document.createElement("style");
				if (classChild) {
					style.innerHTML = `.command-name-${classParent}:has(${classChild}) { display: none }`;
				} else {
					style.innerHTML = `.command-name-${classParent} { display: none }`;
				}
				style.setAttribute(`data-hide-${name}-log-request`, "");
				app.document.head.appendChild(style);
			}
		}
	},
};

export default setupHelper;
