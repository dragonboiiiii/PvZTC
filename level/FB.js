oS.Init(
	{
		PName: [
			oFlowerPot,
			oCFlowerPot,
			oJalapeno,
			oRepeater,
			oThreepeater,
			oTenManNut,
			oBigChomper,
		],
		ZName: [
			oCZombie,
			oCZombie2,
			oCZombie3,
			oCConeheadZombie,
			oCBucketheadZombie,
			othugZombie,
			oEunZombie,
			oZZ,
		],
		PicArr: ["images/interface/backgroundwall.jpg"],
		backgroundImage: "images/interface/backgroundwall.jpg",
		LF: [0, 3, 3, 3, 3, 3, 3],
		CanSelectCard: 0,
		DKind: 0,
		LevelName: "Battle of the Pass",
		LvlEName: "40",
		LargeWaveFlag: {
			10: $("imgFlag4"),
			20: $("imgFlag3"),
			30: $("imgFlag2"),
			40: $("imgFlag1"),
		},
		InitLawnMower: function () {
			CustomSpecial(oCleaner, 1, -1);
			CustomSpecial(oCleaner, 2, -1);
			CustomSpecial(oCleaner, 3, -1);
			CustomSpecial(oCleaner, 4, -1);
			CustomSpecial(oCleaner, 5, -1);
		},
		StartGameMusic: "Zombieboss",
		StaticCard: 0,
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
									b =
										oP.FlagZombies < 6
											? Math.floor(
													1 + Math.random() * 10
												) < 4
												? 1
												: Math.floor(
														Math.random() * c.length
													)
											: Math.floor(
														1 + Math.random() * 10
												  ) < 3
												? 0
												: Math.floor(
														Math.random() * c.length
													),
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
			[oCZombie, 1, 1],
			[oCZombie2, 1, 5],
			[oCZombie3, 2, 10],
			[oCConeheadZombie, 2, 15],
			[oCBucketheadZombie, 2, 20],
			[othugZombie, 1, 25],
			[oEunZombie, 1, 30],
			[oZZ, 1, 35],
		],
		FlagNum: 40,
		FlagToSumNum: {
			a1: [3, 5, 9, 10, 13, 15, 19, 20, 23, 25, 29],
			a2: [1, 2, 3, 10, 4, 5, 6, 15, 7, 8, 9, 25, 48, 60],
		},
		FlagToMonitor: {
			9: [ShowLargeWave, 0],
			19: [ShowLargeWave, 0],
			29: [ShowLargeWave, 0],
			39: [ShowFinalWave, 0],
		},
		FlagToEnd: function () {
			NewImg(
				"imgSF",
				"images/interface/0.gif",
				"left:667px;top:330px;clip:rect(auto,auto,237px,auto)",
				EDAll,
				{
					onclick: function () {
						GetNewCard(this, oGoldenPrize, 0);
					},
				}
			);
		},
	},
	{
		GetChoseCard: function (b) {
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
		ViewPlantTitle: function (a) {},
	}
);
