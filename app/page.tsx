'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Heart, Gift, Sparkles, Flower2, ChevronDown, Edit3 } from 'lucide-react';
import { PasswordModal } from '@/components/PasswordModal';
import { CatalogDisplay } from '@/components/CatalogDisplay';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCatalog, setExpandedCatalog] = useState<string | null>('bouquets');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleEditClick = () => {
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSuccess = () => {
    setIsPasswordModalOpen(false);
    setIsEditing(true);
  };

  const catalogSections = [
    {
      id: 'bouquets',
      title: 'Цветы в букете',
      description: 'Букеты в нежной упаковке с лентой',
      items: [
        { img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%91%D1%83%D0%BA%D0%B5%D1%82%20%D1%82%D1%8E%D0%BB%D1%8C%D0%BF%D0%B0%D0%BD%D1%8B-MxylnF6DSfe3oBS85AEuFuoIbDbcQX.png', name: 'Нежные тюльпаны' },
        { img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%91%D1%83%D0%BA%D0%B5%D1%82%20%D1%82%D1%8E%D0%BB%D1%8C%D0%BF%D0%B0%D0%BD%D1%8B%20big-zxSPae5F1NFzXJ2uOhTXMH6Lu34fDe.png', name: 'Большой букет тюльпанов' },
        { img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bouquet_1-t5Uj1hczAL8Kd3R0hV77R1cPugl0QP.png', name: 'Пионы нежные' },
        { img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%91%D1%83%D0%BA%D0%B5%D1%82%20%D1%82%D1%8E%D0%BB%D1%8C%D0%BF%D0%B0%D0%BD%D1%8B-Z98LNlhM4SLcIMYVzwaUX1fbT1jwpq.jpeg', name: 'Букет тюльпанов мятные' },
        { img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D1%82%D1%8E%D0%BB%D1%8C%D0%BF%D0%B0%D0%BD%D1%8B%20%D0%BD%D0%B5%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D1%8C-CjDAfjN3KjMAgChuN1ja7SnAnnr0M3.jpeg', name: 'Нежность розовая' },
        { img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-L66ka4nnCqFF0qGd3lm6BVx6q8690M.png', name: 'Букет розовой мечты' },
      ]
    },
    {
      id: 'boxes',
      title: 'Цветы в коробке',
      description: 'Круглые и квадратные коробочки для особых подарков',
      items: [
        { img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%9A%D0%BE%D1%80%D0%BE%D0%B1%D0%BA%D0%B0%201-n46I8yOHyDtjMCSn2HKGad8BmiO4ia.png', name: 'Коробка розовых пионов' },
        { img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%9A%D0%BE%D1%80%D0%BE%D0%B1%D0%BA%D0%B0%202-10vUJcg5J9KDxiD6nNPK8d13aD3Gat.png', name: 'Коробка микс цветов' },
        { img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%9A%D0%BE%D1%80%D0%BE%D0%B1%D0%BA%D0%B0%203-11ShGHkf5geX1KVAIBbdfujF3HK3PI.png', name: 'Коробка нежных пионов' },
        { img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bouquet_2-wRt1lVgCTbxMghp1AD0R90XQnB6n1N.png', name: 'Премиум коробка' },
        { img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bouquet_10-bZ4oEQAb01JQi4yazSAUsQG66WfXZS.png', name: 'Коробка с окошком' },
      ]
    },
    {
      id: 'baskets',
      title: 'Цветы в корзинке-сумочке',
      description: 'Удобные корзинки-сумочки для легкого переноски и красивого вручения подарка',
      items: [
        { img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KCBkbQPT9HvEYGYx9Eofgmus4uAbhS.png', name: 'Корзинка с пестрыми пионами' },
        { img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tn0x0ebIaTFxBo171vI3CchR5iR9ID.png', name: 'Корзинка с фиолетовыми тюльпанами' },
        { img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gFj2mYK3yAfEyPKzw8EFqclymQksWj.png', name: 'Розовая сумочка с букетом' },
      ]
    },
    {
      id: 'sets',
      title: 'Наборы цветов',
      description: 'Создавайте шедевры из своей домашней выпечки! Вы можете самостоятельно составить красивую композицию, используя наши наборы цветов из натурального зефира. Украсьте торты, капкейки и десерты волшебными цветами, которые удивят и порадуют ваших близких.',
      items: [
        { img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AkTgCBLkxBqcFhtzZKG0Dazyb9RbMO.png', name: 'Набор фиолетовых тюльпанов' },
        { img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FyH9UsEDdPPzuMEwAxvfqCYyiKLmmF.png', name: 'Набор пастельных цветов' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/90 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Sweet Bouquet Lab
              </h1>
              <p className="text-xs text-muted-foreground font-medium">сделано с любовью</p>
              <p className="text-xs text-muted-foreground">вкусные букеты из зефира</p>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex gap-8 items-center">
              <button
                onClick={() => scrollToSection('about')}
                className="text-sm hover:text-primary transition-colors font-medium"
              >
                О букетах
              </button>
              <button
                onClick={() => scrollToSection('why')}
                className="text-sm hover:text-primary transition-colors font-medium"
              >
                Почему букет?
              </button>
              <button
                onClick={() => scrollToSection('catalog')}
                className="text-sm hover:text-primary transition-colors font-medium"
              >
                Каталог
              </button>
              <button
                onClick={() => scrollToSection('workshop')}
                className="text-sm hover:text-primary transition-colors font-medium"
              >
                Мастерская
              </button>
              <button
                onClick={() => scrollToSection('contacts')}
                className="text-sm hover:text-primary transition-colors font-medium"
              >
                Контакты
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="md:hidden pb-4 space-y-3 border-t border-border pt-4">
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-sm hover:text-primary transition-colors font-medium"
              >
                О букетах
              </button>
              <button
                onClick={() => scrollToSection('why')}
                className="block w-full text-left text-sm hover:text-primary transition-colors font-medium"
              >
                Почему букет?
              </button>
              <button
                onClick={() => scrollToSection('catalog')}
                className="block w-full text-left text-sm hover:text-primary transition-colors font-medium"
              >
                Каталог
              </button>
              <button
                onClick={() => scrollToSection('workshop')}
                className="block w-full text-left text-sm hover:text-primary transition-colors font-medium"
              >
                Мастерская
              </button>
              <button
                onClick={() => scrollToSection('contacts')}
                className="block w-full text-left text-sm hover:text-primary transition-colors font-medium"
              >
                Контакты
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-accent opacity-40" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight text-pretty">
                Вкусные букеты из{' '}
                <span className="text-primary">зефира</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Красивые как живые цветы, но вкусные как лучший десерт. Натуральный состав, воздушная текстура, и подарок, который точно удивит.
              </p>
              <button
                onClick={() => scrollToSection('catalog')}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                Посмотреть каталог
              </button>
            </div>
            {/* Hero Image */}
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oivPP55Lfiz5XjaWm3KuP2X82Gzc98.png"
                alt="Букеты из зефира"
                fill
                className="object-cover"
                priority
              />
              {/* Logo Badge */}
              <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full bg-white/90 border-2 border-white shadow-lg p-1 flex items-center justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9m1yaAAueaYKKwiVmWehHgZEsbMNV7.png"
                  alt="Berlin Sweet Bouquet Zefir Logo"
                  width={76}
                  height={76}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold mb-12 text-center text-pretty">
            Что такое вкусные букеты из зефира?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all">
              <Flower2 className="w-12 h-12 text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-3">Реалистичные цветы</h4>
              <p className="text-muted-foreground leading-relaxed">
                Каждый цветок сделан вручную из натурального зефира. Розы, пионы, гортензии выглядят как живые, но значительно вкуснее!
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all">
              <Heart className="w-12 h-12 text-accent mb-4" />
              <h4 className="text-xl font-semibold mb-3">Натуральные ингредиенты</h4>
              <p className="text-muted-foreground leading-relaxed">
                Пюре из яблок и ягод, агар-агар, яичный белок, пониженное содержание сахара — никаких химических добавок.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all">
              <Gift className="w-12 h-12 text-primary/70 mb-4" />
              <h4 className="text-xl font-semibold mb-3">Подарок 2 в 1</h4>
              <p className="text-muted-foreground leading-relaxed">
                Красивые цветы и вкусный десерт в одной праздничной коробке. Срок годности до 20 дней!
              </p>
            </div>
          </div>

          <div className="mt-16 bg-card rounded-2xl p-10 border border-border">
            <h4 className="text-2xl font-semibold mb-6">Состав и особенности</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-primary mb-3">В составе зефира:</h5>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Натуральное ��юре из фруктов и ягод</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Агар-агар (природный загуститель вместо желатина)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Пастеризованный яичный белок</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Сахар (или сахарозаменитель) и глюкозный сироп (на 50% меньше, чем в ГОСТ)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Щепотка ванилина</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Пищевые красители</span>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-accent mb-3">На коробке указано:</h5>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Состав: все ингредиенты</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Дата изготовления</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Срок хранения: до 20 дней</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Пищевая ценность на 100 г</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Энергетическая ценность</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Условия хранения</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="why" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold mb-12 text-center text-pretty">
            Почему сладкий букет?
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/40 transition-colors hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="w-7 h-7" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Запомнится надолго</h4>
                  <p className="text-muted-foreground text-sm">Такой подарок точно не останется без внимания и выделит вас среди остальных</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/40 transition-colors hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-accent/10 text-accent">
                    <Heart className="w-7 h-7" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Полезнее и вкуснее</h4>
                  <p className="text-muted-foreground text-sm">Пониженное содержание сахара и натуральные ингредиенты — идеален для тех, кто ценит качество</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/40 transition-colors hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-primary/10 text-primary">
                    <Gift className="w-7 h-7" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Букеты разных размеров</h4>
                  <p className="text-muted-foreground text-sm">От небольшого символического подарка до шикарной композиции для особых случаев</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/40 transition-colors hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-accent/10 text-accent">
                    <Flower2 className="w-7 h-7" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Не завянут</h4>
                  <p className="text-muted-foreground text-sm">Цветы из зефира останутся свежими, вкусными и красивыми надолго, даже в морозы</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/40 transition-colors hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="w-7 h-7" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Легко держать</h4>
                  <p className="text-muted-foreground text-sm">Воздушный зефир делает букеты невесомыми — даже ребенок без труда поднимет такой подарок</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/40 transition-colors hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-accent/10 text-accent">
                    <Heart className="w-7 h-7" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Долгий срок годности</h4>
                  <p className="text-muted-foreground text-sm">До 20 дней при комнатной температуре — дольше, чем большинство живых букетов!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold mb-4 text-center text-pretty">
            Каталог вкусных букетов
          </h3>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Красивые композиции для любого случая
          </p>

          {/* Catalog Tabs */}
          <CatalogDisplay
            catalogSections={catalogSections}
            expandedCatalog={expandedCatalog}
            onToggleSection={(sectionId) => setExpandedCatalog(expandedCatalog === sectionId ? null : sectionId)}
            isEditing={isEditing}
          />

          {/* Compliments Section */}
          <div className="mt-16">
            <h4 className="text-2xl font-bold text-center mb-8 text-primary">Комплименты</h4>
            <p className="text-center text-muted-foreground mb-8">Маленькие порции для приятных мелочей</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all group">
                <div className="h-56 relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gSRW40vEgm3wcXCWRK2mzfiIKtOmgs.png"
                    alt="Набор из 5 капкейков с цветами из зефира"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-sm">Набор из 5 капкейков</p>
                  <p className="text-xs text-muted-foreground">Разные цвета</p>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all group">
                <div className="h-56 relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hJYMWBBCJuvSSBX8zDDx34fDmBNnEj.png"
                    alt="Один капкейк с розовым тюльпаном"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-sm">Один капкейк</p>
                  <p className="text-xs text-muted-foreground">С розовым тюльпаном</p>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all group">
                <div className="h-56 relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-f1g3Pae7jkJNEcxDdW5G10Nr6dQpTK.png"
                    alt="Три капкейка с фиолетовыми тюльпанами"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-sm">Три капкейка</p>
                  <p className="text-xs text-muted-foreground">С фиолетовыми тюльпанами</p>
                </div>
              </div>
            </div>
          </div>

          {/* Accessories Section */}
          <div className="mt-16">
            <h4 className="text-2xl font-bold text-center mb-8 text-accent">Аксессуары</h4>
            <p className="text-center text-muted-foreground mb-8">Открытки, поздравления и украшения для особых подарков</p>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all group">
                <div className="h-48 relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-s2d8RguGm7tHFoWLu3LGBGhHhGBMVm.png"
                    alt="Букет с поздравительной открыткой"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-sm text-center">Поздравительные открытки</p>
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all group">
                <div className="h-48 relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kEQU5zXCDm7NYJ4CyJ56ZvYfXgGTQ9.png"
                    alt="Букет с декоративными бабочками"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-sm text-center">Декоративные бабочки</p>
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all group">
                <div className="h-48 relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FKh1LIz81URM98cwsQ8GqEM5FVLvoI.png"
                    alt="Корзинка с бантами и лентами"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-sm text-center">Ленты и украшения</p>
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all group">
                <div className="h-48 relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jL8a4tI5ZnzZOVKhizxM6YIj8mjzoh.png"
                    alt="Разноцветная бумага для украшения"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-sm text-center">Наборы для украшения</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Хотите особый букет? Мы создаём индивидуальные композиции по вашим пожеланиям!
            </p>
          </div>
        </div>
      </section>

      {/* Workshop Section */}
      <section id="workshop" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold mb-12 text-center text-pretty">
            Мастерская зефира
          </h3>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-2xl font-semibold mb-4 text-primary">Как создаются зефирные цветы</h4>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Каждый букет — это шедевр ручной работы. Мы используем только свежее натуральное пюре из фруктов и ягод, которое готовится непосредственно перед началом работы.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">1.</span>
                  <span className="text-muted-foreground">Готовим свежее пюре из яблок и ягод</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">2.</span>
                  <span className="text-muted-foreground">Взбиваем с яичным белком и агар-агаром</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">3.</span>
                  <span className="text-muted-foreground">Формируем каждый лепесток вручную</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">4.</span>
                  <span className="text-muted-foreground">Собираем в красивую композицию</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">5.</span>
                  <span className="text-muted-foreground">Бережно упаковываем в пищевую пленку для бережного хранения и транспортировки</span>
                </li>
              </ul>
            </div>
            <div className="h-96 rounded-3xl overflow-hidden shadow-lg relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yv6KB0CzSBnHvZ4K3IH6PIShd3szAs.png"
                alt="Процесс создания букета из зефира - пошагово"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          <div className="mt-16 bg-card rounded-2xl p-10 border border-border">
            <h4 className="text-2xl font-semibold mb-4 text-center">Вы можете собрать свой индивидуальный букет</h4>
            <p className="text-center text-muted-foreground mb-8">Каждый букет создан под любой повод, с любым количеством зефирных цветов и оформлением. Мы учитываем персональные пожелания: сахарозаменитель вместо сахара, стевия, аналоги — всё возможно!</p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-40 relative rounded-xl mb-4 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cSRkUJGHd0hbvDxeMOUl11l5pViu14.png"
                    alt="Подарочные пакеты и корзинки"
                    fill
                    className="object-cover"
                  />
                </div>
                <h5 className="font-semibold mb-2">Корзинки-сумочки</h5>
                <p className="text-sm text-muted-foreground">Удобно носить и эффектно выглядит</p>
              </div>
              <div className="text-center">
                <div className="h-40 relative rounded-xl mb-4 overflow-hidden bg-gradient-to-br from-secondary/10 to-primary/10">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jiQdibNRlmxmridG4c8OsKy6lEKtu1.png"
                    alt="Красные круглые коробки"
                    fill
                    className="object-cover"
                  />
                </div>
                <h5 className="font-semibold mb-2">Коробки круглые</h5>
                <p className="text-sm text-muted-foreground">Элегантное решение для красивого подарка</p>
              </div>
              <div className="text-center">
                <div className="h-40 relative rounded-xl mb-4 overflow-hidden bg-gradient-to-br from-accent/10 to-primary/10">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-miZBIUz8b2MjuhjRcHacdTdIGXHhYX.png"
                    alt="Картонные коробки с окошком"
                    fill
                    className="object-cover"
                  />
                </div>
                <h5 className="font-semibold mb-2">Коробки с окошком</h5>
                <p className="text-sm text-muted-foreground">С окошком для демонстрации букета</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold mb-12 text-center text-pretty">
            Контакты
          </h3>

          <div className="bg-card rounded-2xl p-10 border border-border">
            <div className="max-w-2xl mx-auto">
              <h4 className="text-2xl font-semibold mb-8 text-primary text-center">Связаться с нами</h4>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 text-primary overflow-hidden border-2 border-primary/20">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo%20Elena-K8O2BhpVCTpNOZkijb6XHaswOtaOrx.jpg"
                        alt="Елена - создатель Sweet Bouquet Lab"
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Хозяйка мастерской</h5>
                    <p className="text-muted-foreground text-lg">
                      <strong>Елена</strong>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Создатель Sweet Bouquet Lab, специалист по ручному изготовлению букетов из натурального зефира.
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="text-center text-muted-foreground">
                    <em>Детали контактов и способы связи будут добавлены позже</em>
                  </p>
                </div>

                <div className="bg-accent/10 rounded-lg p-4 mt-8">
                  <p className="text-sm text-muted-foreground text-center">
                    Мы принимаем заказы букетов из натурального зефира для любых случаев: дни рождения, годовщины, свадьбы и просто как эффектный подарок.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4 text-primary">Sweet Bouquet Lab</h4>
              <p className="text-sm text-muted-foreground">
                Вкусные букеты из натурального зефира для самых особенных людей
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-sm">Навигация</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    О букетах
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('catalog')}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Каталог
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('workshop')}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Мастерская
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-sm">Каталог</h5>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">Букеты</li>
                <li className="text-muted-foreground">Коробки</li>
                <li className="text-muted-foreground">Комплименты</li>
                <li className="text-muted-foreground">Акцессуары</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-sm">Контакты</h5>
              <p className="text-sm text-muted-foreground">
                Елена<br />
                <em className="text-xs">Детали будут добавлены позже</em>
              </p>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center space-y-6">
            <p className="text-sm text-muted-foreground">
              © 2026 Sweet Bouquet Lab. Все права защищены.
            </p>
            <div className="flex justify-center gap-3">
              {isEditing && (
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                >
                  Выход из редактирования
                </button>
              )}
              {!isEditing && (
                <button
                  onClick={handleEditClick}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-all hover:scale-105 text-sm font-medium"
                >
                  <Edit3 className="w-4 h-4" />
                  Редактировать каталог
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>

      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={handlePasswordSuccess}
      />
    </div>
  );
}
