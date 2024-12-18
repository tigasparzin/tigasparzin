let janelas = [];
		let janelaArrastando = null;
		let deltaX = 0, deltaY = 0;

		document.body.addEventListener("mousedown", function (ev) {
			if (ev.target.tagName !== "DIV" || !ev.target.classList.contains("janela-titulo")) {
				return;
			}

			ev.stopPropagation();
			ev.preventDefault();

			janelaArrastando = ev.target.parentNode;
			let rect = janelaArrastando.getBoundingClientRect();

			deltaX = ev.clientX - rect.x;
			deltaY = ev.clientY - rect.y;

			for (let i = 0; i < janelas.length; i++) {
				if (janelas[i] === janelaArrastando) {
					janelas.splice(i, 1);
					janelas.push(janelaArrastando);
					break;
				}
			}

			for (let i = 0; i < janelas.length; i++) {
				janelas[i].style.zIndex = i;
			}

			return false;
		}, {
			capture: true
		});

		document.body.addEventListener("mousemove", function (ev) {
			if (!janelaArrastando) {
				return;
			}

			//console.log(`pageY: ${ev.pageY} / screenY: ${ev.screenY} / offsetY: ${ev.offsetY}`);
			janelaArrastando.style.left = (ev.pageX - deltaX) + "px";
			janelaArrastando.style.top = (ev.pageY - deltaY) + "px";

			return false;
		}, {
			capture: true
		});

		document.body.addEventListener("mouseup", function (ev) {
			if (!janelaArrastando) {
				return;
			}

			janelaArrastando = null;
		}, {
			capture: true
		});

		function prepararZ() {
			let tmp = document.getElementsByClassName("janela");

			for (let i = 0; i < tmp.length; i++) {
				janelas.push(tmp[i]);
				janelas[i].style.zIndex = i;
			}
		}

		prepararZ();



		function fecharJanela(janelaId) {
			const janela = document.getElementById(janelaId);
			if (janela) {
				janela.classList.add("hidden");
			}
		}

		function skills() {
			const janela1 = document.getElementById("skills");
		
			janela1.classList.remove("hidden");
		};

		
		function contato() {
			const janela2 = document.getElementById("contato");
			
			janela2.classList.remove("hidden");
		};



		function updateDateTime() {
			const now = new Date();
			const date = now.toLocaleDateString();
			const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		
			document.getElementById('data').innerHTML = date;
			document.getElementById('hora').innerHTML = time;
		}
		
		setInterval(updateDateTime, 1000);
		