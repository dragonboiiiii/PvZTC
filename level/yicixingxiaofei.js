oS.Init(
	{
		PName: [oCherryBomb, oJalapeno],
		ZName: [
			oZombie,
			oZombie2,
			oZombie3,
			oPoleVaultingZombie,
			oFootballZombie,
			oImp,
		],
		PicArr: [
			"images/interface/background1.jpg",
			"images/interface/trophy.png",
		],
		backgroundImage: "images/interface/background1.jpg",
		CanSelectCard: 0,
		LevelName: "Blast Blitz",
		LvlEName: "DisposableProducts",
		LargeWaveFlag: { 20: $("imgFlag1") },
		StaticCard: 0,
		StartGameMusic: "GrazeTheRoof2",
		StartGame: function () {
			StopMusic();
			PlayMusic((oS.LoadMusic = oS.StartGameMusic));
			SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
			SetHidden($("dSunNum"));
			oS.InitLawnMower();
			PrepareGrowPlants(function () {
				oP.Monitor({
					f: function () {
						(function () {
							var a = ArCard.length;
							if (a < 10) {
								var c = oS.PName,
									b = Math.floor(Math.random() * c.length),
									e = c[b],
									d = e.prototype,
									f = "dCard" + Math.random();
								ArCard[a] = { DID: f, PName: e, PixelTop: 600 };
								NewImg(
									f,
									d.PicArr[d.CardGif],
									"top:600px;width:100px;height:120px;cursor:url(images/interface/Pointer.cur),pointer;clip:rect(auto,auto,60px,auto)",
									$("dCardList"),
									{
										onmouseover: function (g) {
											ViewPlantTitle(GetChoseCard(f), g);
										},
										onmouseout: function () {
											SetHidden($("dTitle"));
										},
										onclick: function (g) {
											ChosePlant(g, oS.ChoseCard, f);
										},
									}
								);
							}
							oSym.addTask(600, arguments.callee, []);
						})();
						(function () {
							var b = ArCard.length,
								a,
								c;
							while (b--) {
								(c = (a = ArCard[b]).PixelTop) > 60 * b &&
									($(a.DID).style.top =
										(a.PixelTop = c - 1) + "px");
							}
							oSym.addTask(5, arguments.callee, []);
						})();
					},
					ar: [],
				});
				oP.AddZombiesFlag();
				SetVisible($("dFlagMeterContent"));
			});
		},
	},
	{
		AZ: [
			[oZombie, 3, 10],
			[oZombie2, 2, 10],
			[oZombie3, 1, 1],
			[oFootballZombie, 1, 5],
			[oPoleVaultingZombie, 1, 2],
			[oImp, 1, 3],
		],
		FlagNum: 20,
		FlagToSumNum: {
			a1: [3, 5, 9, 10, 13, 15, 19, 30],
			a2: [1, 7, 12, 20, 13, 16, 21, 30],
		},
		FlagToMonitor: { 19: [ShowFinalWave, 0] },
		FlagToEnd: function () {
			NewImg(
				"imgSF",
				"images/interface/trophy.png",
				"left:260px;top:233px",
				EDAll,
				{
					onclick: function () {
						SelectModal(0);
					},
				}
			);
			NewImg(
				"PointerUD",
				"images/interface/PointerDown.gif",
				"top:198px;left:269px",
				EDAll
			);
		},
	},
	{
		GetChoseCard: function (b) {
			if (oS.Chose) {
				return;
			}
			var a = ArCard.length;
			while (a--) {
				ArCard[a].DID == b && ((oS.ChoseCard = a), (a = 0));
			}
			return oS.ChoseCard;
		},
		ChosePlant: function (a, b) {
			PlayAudio("seedlift");
			a = window.event || a;
			var f = ArCard[oS.ChoseCard],
				e =
					a.clientX - EDAlloffsetLeft + EBody.scrollLeft ||
					EElement.scrollLeft,
				d = a.clientY + EBody.scrollTop || EElement.scrollTop,
				c = f.PName.prototype;
			oS.Chose = 1;
			EditImg(
				NewImg(
					"MovePlant",
					c.PicArr[c.StaticGif],
					"left:" +
						e -
						0.5 * (c.beAttackedPointL + c.beAttackedPointR) +
						"px;top:" +
						d +
						20 -
						c.height +
						"px;z-index:254",
					EDAll
				).cloneNode(false),
				"MovePlantAlpha",
				"",
				{
					visibility: "hidden",
					filter: "alpha(opacity=40)",
					opacity: 0.4,
					zIndex: 30,
				},
				EDAll
			);
			SetAlpha($(f.DID), 50, 0.5);
			SetHidden($("dTitle"));
			GroundOnmousemove = GroundOnmousemove1;
		},
		CancelPlant: function () {
			ClearChild($("MovePlant"), $("MovePlantAlpha"));
			oS.Chose = 0;
			SetAlpha($(ArCard[oS.ChoseCard].DID), 100, 1);
			oS.ChoseCard = "";
			GroundOnmousemove = function () {};
		},
		GrowPlant: function (l, c, b, f, a) {
			var j = oS.ChoseCard,
				g = ArCard[j],
				i = g.PName,
				k = i.prototype,
				d = g.DID,
				e,
				h = oGd.$LF[f];
			k.CanGrow(l, f, a) &&
				(function () {
					PlayAudio(
						h != 2
							? "plant" + Math.floor(1 + Math.random() * 2)
							: "plant_water"
					);
					new i().Birth(c, b, f, a, l);
					oSym.addTask(20, SetNone, [
						SetStyle($("imgGrowSoil"), {
							left: c - 30 + "px",
							top: b - 40 + "px",
							zIndex: 3 * f,
							visibility: "visible",
						}),
					]);
					ClearChild($("MovePlant"), $("MovePlantAlpha"));
					$("dCardList").removeChild((e = $(d)));
					e = null;
					ArCard.splice(j, 1);
					oS.ChoseCard = "";
					oS.Chose = 0;
					GroundOnmousemove = function () {};
				})();
		},
		ViewPlantTitle: function (a) {
			var c = $("dTitle"),
				b = ArCard[a].PName.prototype;
			c.innerHTML = b.CName + "<br>" + b.Tooltip;
			SetStyle(c, { top: 60 * a + "px", left: "100px" });
		},
	}
);
